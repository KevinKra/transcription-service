// ? param-reassign is fine, RTK uses immer (https://redux-toolkit.js.org/tutorials/quick-start)
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type IAlertStatus = "success" | "warning" | "error";

interface IAlertSlice {
  type: IAlertStatus;
  message: string;
  display: "client-only" | "internal-only" | "support-both";
  key?: string | number;
}

const initialState: IAlertSlice = {
  type: "success",
  message: "",
  display: "internal-only",
  key: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<IAlertSlice>) => {
      state = {
        ...action.payload,
        key: Date.now(),
      };
    },
  },
});

export const selectAlert = createSelector(
  (state: RootState) => state.alert,
  (alert) => alert
);

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
