/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../../helpers/apiRouteHandler/apiRouteHandler";
import { IAxiosResponse } from "../../../../types";

export interface ISearchForMediaS3 extends IAxiosResponse {
  data: IAxiosResponse["data"] & {
    data?: {
      mediaFormat: string;
      bucketURI: string;
    };
  };
}

export const searchForMediaS3 = async (
  contentId: string
): Promise<ISearchForMediaS3["data"]> => {
  const s3FileEndpoint = getApiAddress(ApiEndpointsEnum.s3BucketsIdFilesId, [
    "parakeet-content-bucket-test",
    `${contentId}`,
  ]);

  try {
    const response: ISearchForMediaS3 = await axios.get(s3FileEndpoint);
    return {
      type: response.data.type,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      // todo -- set to DRY function
      type: error.response?.data.type || "error",
      message: error.response?.data.message || "Oops, something went wrong.",
    };
  }
};
