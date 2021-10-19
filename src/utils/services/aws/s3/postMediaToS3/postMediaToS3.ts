/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../../helpers/apiRouteHandler/apiRouteHandler";
import { axiosErrorHandler } from "../../../../helpers/axiosErrorHandler/axiosErrorHandler";
import { IAxiosResponse } from "../../../../types";

export type s3Response = { mediaFormat: string; bucketURI: string };

export interface IPostMediaToS3Res extends IAxiosResponse {
  data: IAxiosResponse["data"] & {
    data?: s3Response;
  };
}

export const postMediaToS3 = async (
  contentId: string
): Promise<IPostMediaToS3Res["data"]> => {
  const s3FilePostEndpoint = getApiAddress(ApiEndpointsEnum.s3);

  try {
    const response: IPostMediaToS3Res = await axios.post(s3FilePostEndpoint, {
      data: { videoId: contentId },
    });
    return {
      type: response.data.type,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};
