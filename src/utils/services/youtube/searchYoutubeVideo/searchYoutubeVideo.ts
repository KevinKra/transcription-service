/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../helpers/apiRouteHandler/apiRouteHandler";
import { IQueryResponse } from "../../../types";
import axios from "axios";

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

export interface IVideoThumbnail {
  url: string;
  width: number;
  height: number;
}
export interface IVideoChapter {
  title: string;
  startTime: number;
}

export interface IMediaContent {
  title: string;
  description: string;
  category: string;
  lengthSeconds: string;
  videoId: string;
  videoURL: string;
  uploadDate: string;
  keywords: string[];
  ageRestricted: boolean;
  isFamilySafe: boolean;
  chapters: IVideoChapter[];
  videoThumbnails: IVideoThumbnail[];
  embed: {
    iframeURL: string;
  };
}

interface IYoutubeResponse {
  type: string;
  data: {
    author: IAuthor;
    content: IMediaContent;
  };
}

interface YTQueryResponse extends IQueryResponse {
  data?: IYoutubeResponse;
}

const searchYoutubeVideo = async (
  contentId: string
): Promise<YTQueryResponse> => {
  const youtubeGetEndpoint = getApiAddress(ApiEndpointsEnum.youtubeId, [
    `${contentId}`,
  ]);

  try {
    const response: any = await axios.get(youtubeGetEndpoint);
    // todo -- resolve the above linter rules so this can pass within lint guidelines
    return {
      type: "success",
      data: response?.data,
    };
  } catch (error) {
    return {
      type: "error",
    };
  }
};

export default searchYoutubeVideo;
