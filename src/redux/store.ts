// ? https://redux-toolkit.js.org/tutorials/typescript
// ? https://www.merixstudio.com/blog/introduction-using-redux-toolkit-nextjs-and-typescript/
// ? https://www.emgoto.com/redux-toolkit/
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import alertSliceReducer from "./slices/alertSlice/alertSlice";
import mediaSliceReducer from "./slices/mediaSlice/mediaSlice";

export const store = configureStore({
  reducer: {
    alert: alertSliceReducer,
    media: mediaSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
