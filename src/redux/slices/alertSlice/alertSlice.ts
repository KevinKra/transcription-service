// ? param-reassign is fine, RTK uses immer (https://redux-toolkit.js.org/tutorials/quick-start)
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// IAlertStatus matches the mui Alert types
export type IAlertStatus = "success" | "warning" | "error" | "info";

export interface IAlertSlice {
  type: IAlertStatus;
  message: string;
  display: "client-only" | "internal-only" | "support-both";
  key?: string | number;
}

export const initialAlertState: IAlertSlice = {
  type: "success",
  message: "",
  display: "internal-only",
  key: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
  reducers: {
    setAlert: (state, action: PayloadAction<IAlertSlice>) => {
      return (state = {
        ...action.payload,
        key: Date.now(),
      });
    },
    clearAlert: () => {
      return initialAlertState;
    },
  },
});

export const selectAlert = createSelector(
  (state: RootState) => state.alert,
  (alert) => alert
);

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
