import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import StyledSnackBar from "./StyledSnackBar";
import alertReducer, {
  IAlertSlice,
} from "../../../redux/slices/alertSlice/alertSlice";
import { Provider } from "react-redux";
import user from "@testing-library/user-event";

const mockAlert: IAlertSlice = {
  type: "warning",
  message: "No media has been provided to the video player.",
  display: "client-only",
  key: 1634411717212,
};

// todo -- prefer simple mock redux for this test-suite, this _may_ be overkill
const store = configureStore({
  reducer: { alert: alertReducer },
  preloadedState: {
    alert: mockAlert,
  },
});

const render = (children: JSX.Element) =>
  rtlRender(<Provider store={store}>{children}</Provider>);

describe("StyledSnackBar", () => {
  beforeEach(() => {
    render(<StyledSnackBar />);
  });

  test("if close button is clicked, the snackbar disappears from the screen", async () => {
    const snackbar = screen.queryByText(
      "No media has been provided to the video player."
    );
    const snackbarClose = screen.getByTitle("Close");
    expect(snackbar).toBeInTheDocument();
    user.click(snackbarClose);
    await waitFor(() => expect(snackbar).not.toBeInTheDocument());
  });
});
