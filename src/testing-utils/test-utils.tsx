/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import alertReducer from "../redux/slices/alertSlice/alertSlice";

const store = configureStore({
  reducer: { alert: alertReducer },
});

const render = (children: JSX.Element) =>
  rtlRender(<Provider store={store}>{children}</Provider>);

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
