/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// todo -- might be using 2 linters (next and eslint)
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../helpers/apiRouteHandler/apiRouteHandler";
import { IQueryResponse } from "../../../types";
import axios from "axios";
import { IMedia } from "../../../../redux/slices/mediaSlice/mediaSlice";

// todo -- port these over to proper redux locations asap
export interface IAuthor {
  id: string;
  name: string;
  youtube: string;
  patreon: string;
  primaryLanguage: string;
  primaryTopic: string;
  channelURL: string;
  userURL: string;
  thumbnails: { height: number; width: number }[];
}

interface IYoutubeResponse {
  type: string;
  data: {
    content: IMedia;
    author: any;
    // author: IAuthor;
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
      type: "success",
      message: "Video found.",
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
