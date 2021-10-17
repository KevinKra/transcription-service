// ? param-reassign is fine, RTK uses immer (https://redux-toolkit.js.org/tutorials/quick-start)
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IVideoThumbnail {
  url: string;
  width: number;
  height: number;
}
export interface IVideoChapter {
  title: string;
  startTime: number;
}

export interface IMedia {
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

export const MediaMock: IMedia = {
  title: "",
  description: "",
  category: "",
  lengthSeconds: "",
  videoId: "",
  videoURL: "",
  uploadDate: "",
  keywords: [""],
  ageRestricted: false,
  isFamilySafe: false,
  chapters: [],
  videoThumbnails: [{ url: "", width: 0, height: 0 }],
  embed: {
    iframeURL: "",
  },
};

const initialState = MediaMock;

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMedia: (_, action: PayloadAction<IMedia>) => action.payload,
  },
});

export const selectMedia = createSelector(
  (state: RootState) => state.media,
  (media) => media
);

export const { setMedia } = mediaSlice.actions;

export default mediaSlice.reducer;
