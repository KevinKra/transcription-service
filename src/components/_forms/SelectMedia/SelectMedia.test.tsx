import { render, screen } from "../../../testing-utils/test-utils";
import SelectMedia from "./SelectMedia";
import user from "@testing-library/user-event";

describe("SelectMedia", () => {
  describe("when the component mounts", () => {
    beforeEach(() => {
      render(<SelectMedia />);
    });

    test("no video is selected", () => {
      expect(screen.getByTestId(/video-player-disabled/i)).toBeInTheDocument();
    });

    test("the source url input is enabled", () => {
      expect(screen.getByTestId(/input-source-url/i)).toBeEnabled();
    });

    test("sourceLanguage selection input is disabled", () => {
      expect(
        screen.getByTestId(/input-select-source-language/i)
      ).toBeDisabled();
    });

    test("targetLanguage selection input is disabled", () => {
      expect(
        screen.getByTestId(/input-select-target-language/i)
      ).toBeDisabled();
    });

    test("the submit button is disabled", () => {
      expect(
        screen.getByRole("button", { name: /build lesson/i })
      ).toBeDisabled();
    });
  });

  describe("when a user inputs a url for a youtube video", () => {
    describe("if the url is valid", () => {
      beforeEach(() => {
        render(<SelectMedia />);
        user.click(screen.getByRole("button", { name: /search/i }));
      });

      test("when the user clicks the 'click me' button, a snackbar appears", async () => {
        expect(screen.queryByText(/header/i)).toBeInTheDocument();
        const clickMeButton = screen.getByRole("button", { name: /click me/i });
        user.click(clickMeButton);
        expect(
          await screen.findByText(/great job header/i)
        ).toBeInTheDocument();
      });

      test("the VideoPlayer activates with the provided content", async () => {
        expect(
          await screen.findByTestId(/video-player-enabled/i)
        ).toBeInTheDocument();
      });

      test("the sourceLanguage input is no longer disabled", () => {
        expect(
          screen.getByTestId(/input-select-source-language/i)
        ).toBeEnabled();
      });

      test("the targetLanguage input is no longer disabled", () => {
        expect(
          screen.getByTestId(/input-select-target-language/i)
        ).toBeEnabled();
      });

      test("the submit button is still disabled", () => {
        expect(
          screen.getByRole("button", { name: /build lesson/i })
        ).toBeDisabled();
      });
    });

    describe("if the url is invalid", () => {
      beforeEach(() => {
        render(<SelectMedia />);
        // todo write functionality to handle invalid inputs
        // todo then write these accompanying tests
        user.click(screen.getByRole("button", { name: /search/i }));
      });

      test.todo("the VideoPlayer does not activate");
      test.todo("the sourceLanguage remains disabled");
      test.todo("the targetLanguage remains disabled");
      test.todo("the submit button remains disabled");
    });
  });

  describe("when all inputs have values", () => {
    test.todo("the submit button is no longer disabled");
    describe("when the submit button is clicked", () => {
      test.todo("the submit button changes to the loading variant");
      test.todo("once the job is complete, a success snackbar appears");
      test.todo("after a delay, the page changes");
    });
  });
});
