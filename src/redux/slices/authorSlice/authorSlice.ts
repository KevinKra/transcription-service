// ? param-reassign is fine, RTK uses immer (https://redux-toolkit.js.org/tutorials/quick-start)
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

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

export const authorMock: IAuthor = {
  id: "",
  name: "",
  youtube: "",
  patreon: "",
  primaryLanguage: "",
  primaryTopic: "",
  channelURL: "",
  userURL: "",
  thumbnails: [],
};

const initialState = authorMock;

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<IAuthor>) => action.payload,
  },
});

export const selectAuthor = createSelector(
  (state: RootState) => state.author,
  (author) => author
);

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
