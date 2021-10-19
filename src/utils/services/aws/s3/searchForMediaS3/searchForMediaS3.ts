/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../../helpers/apiRouteHandler/apiRouteHandler";
import { axiosErrorHandler } from "../../../../helpers/axiosErrorHandler/axiosErrorHandler";
import { IAxiosResponse } from "../../../../types";
import { s3Response } from "../postMediaToS3/postMediaToS3";

export interface ISearchForMediaS3 extends IAxiosResponse {
  data: IAxiosResponse["data"] & {
    data?: s3Response;
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
    return axiosErrorHandler(error);
  }
};
