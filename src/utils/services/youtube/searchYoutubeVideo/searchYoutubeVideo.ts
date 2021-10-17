/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../helpers/apiRouteHandler/apiRouteHandler";
import { IAxiosResponse } from "../../../types";
import axios from "axios";
import { IMedia } from "../../../../redux/slices/mediaSlice/mediaSlice";
import { IAuthor } from "../../../../redux/slices/authorSlice/authorSlice";

interface IYoutubeResponse {
  media: IMedia;
  author: IAuthor;
}

export interface YTQueryResponse extends IAxiosResponse {
  data: IAxiosResponse["data"] & { data?: IYoutubeResponse }; // unknown
  // data: Omit<IAxiosResponse["data"], "data"> & { data?: IYoutubeResponse }; // any
}

const searchYoutubeVideo = async (
  contentId: string
): Promise<YTQueryResponse["data"]> => {
  const youtubeGetEndpoint = getApiAddress(ApiEndpointsEnum.youtubeId, [
    `${contentId}`,
  ]);

  try {
    const response: IAxiosResponse = await axios.get(youtubeGetEndpoint);
    return {
      type: response.data.type,
      message: response.data.message,
      data: response.data.data as IYoutubeResponse,
    };
  } catch (error: any) {
    return {
      type: error.response.data.type || "error",
      message: error.response?.data.message || "Something went wrong.",
    };
  }
};

export default searchYoutubeVideo;
