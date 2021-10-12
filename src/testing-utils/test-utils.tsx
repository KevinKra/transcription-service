/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import your own reducer
import alertReducer from "../redux/slices/alertSlice/alertSlice";

// function render(
//   ui: any,
//   {
//     preloadedState,
//     store = configureStore({
//       reducer: { alert: alertReducer },
//       preloadedState,
//     }),
//     ...renderOptions
//   }: any = {}
// ) {
//   function Wrapper({ children }: any) {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

const store = configureStore({
  reducer: { alert: alertReducer },
});

const render = (children: JSX.Element) =>
  rtlRender(<Provider store={store}>{children}</Provider>);

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
