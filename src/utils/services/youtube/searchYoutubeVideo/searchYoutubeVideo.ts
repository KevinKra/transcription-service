/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../helpers/apiRouteHandler/apiRouteHandler";
import { IQueryResponse } from "../../../types";
import axios from "axios";
import { IMedia } from "../../../../redux/slices/mediaSlice/mediaSlice";
import { IAuthor } from "../../../../redux/slices/authorSlice/authorSlice";

interface IYoutubeResponse {
  type: string;
  data: {
    media: IMedia;
    author: IAuthor;
  };
}

export interface YTQueryResponse extends IQueryResponse {
  data?: IYoutubeResponse;
}

const searchYoutubeVideo = async (
  contentId: string
): Promise<YTQueryResponse> => {
  const youtubeGetEndpoint = getApiAddress(ApiEndpointsEnum.youtubeId, [
    `${contentId}`,
  ]);

  try {
    const response: YTQueryResponse = await axios.get(youtubeGetEndpoint);
    return {
      type: response.type,
      message: response.message || "Video found.",
      data: response.data,
    };
  } catch (error: any) {
    return {
      type: error.response?.data.type || "error",
      message: error.response?.data.message || "Something went wrong.",
    };
  }
};

export default searchYoutubeVideo;
