import { render, screen } from "@testing-library/react";
import StyledSnackBar from "./StyledSnackBar";
import user from "@testing-library/user-event";

jest.mock("react-redux", () => {
  return {
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

describe("StyledSnackBar", () => {
  beforeEach(() => {
    render(<StyledSnackBar />);
  });
  test.todo("if the redux alertState has a key, setOpen to true");

  test.skip("if close button is clicked, setOpen is set to false", () => {
    user.click(screen.getByRole("button", { name: /close/i }));
  });
});
