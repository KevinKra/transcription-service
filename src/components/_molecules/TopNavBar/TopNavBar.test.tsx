import { render, screen } from "../../../testing-utils/test-utils";
import TopNavBar from "./TopNavBar";

describe("TopNavBar", () => {
  describe("when the component mounts", () => {
    describe("and no user is logged in", () => {
      beforeEach(() => {
        render(
          <TopNavBar
            switchToDarkMode={jest.fn()}
            switchToLightMode={jest.fn()}
            darkModeActive={false}
          />
        );
      });
      test("main title is present", () => {
        expect(screen.queryByText(/parakeet/i)).toBeInTheDocument();
      });

      test("create Lesson link is present", () => {
        expect(screen.queryByText(/create lesson/i)).toBeInTheDocument();
      });

      test("the 'sign in' button is present", () => {
        expect(
          screen.queryByRole("button", { name: /sign in/i })
        ).toBeInTheDocument();
      });

      test("the 'sign up' button is present", () => {
        expect(
          screen.queryByRole("button", { name: /sign up/i })
        ).toBeInTheDocument();
      });
    });
  });
});
