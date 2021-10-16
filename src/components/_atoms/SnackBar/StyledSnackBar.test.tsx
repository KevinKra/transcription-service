import { render } from "../../../testing-utils/test-utils";
import StyledSnackBar from "./StyledSnackBar";

// jest.mock("react-redux", () => {
//   return {
//     ...jest.requireActual("react-redux"),
//     store: {
//       alert: {
//         type: "warning",
//         message: "No media has been provided to the video player.",
//         display: "client-only",
//         key: 1634411717212,
//       },
//     },
//   };
// });

describe("StyledSnackBar", () => {
  beforeEach(() => {
    render(<StyledSnackBar />);
  });

  test.todo("if close button is clicked, setOpen is set to false");
  // eslint-disable-next-line jest/no-commented-out-tests
  // test("if close button is clicked, setOpen is set to false", () => {
  // expect(
  //   screen.queryByText("No media has been provided to the video player.")
  // ).toBeInTheDocument();

  // click escape button

  // assert toast is no longer in the document
  // });
});
