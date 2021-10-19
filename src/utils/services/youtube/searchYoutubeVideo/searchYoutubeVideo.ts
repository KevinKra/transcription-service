import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../helpers/apiRouteHandler/apiRouteHandler";
import { IAxiosResponse } from "../../../types";
import axios from "axios";
import { IMedia } from "../../../../redux/slices/mediaSlice/mediaSlice";
import { IAuthor } from "../../../../redux/slices/authorSlice/authorSlice";
import { axiosErrorHandler } from "../../../helpers/axiosErrorHandler/axiosErrorHandler";

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
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export default searchYoutubeVideo;
