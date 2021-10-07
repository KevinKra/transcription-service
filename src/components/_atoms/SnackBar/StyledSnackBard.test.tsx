import { render } from "@testing-library/react";
import StyledSnackBar from "./StyledSnackBar";
// import StyledSnackBar from "./StyledSnackBar";

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
  test.todo("tests are written for this");
});
