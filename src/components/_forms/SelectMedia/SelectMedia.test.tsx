import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../../testing-utils/test-utils";
import { rest, DefaultRequestBody } from "msw";
import { setupServer } from "msw/node";
import SelectMedia from "./SelectMedia";
import user from "@testing-library/user-event";
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../utils/helpers/apiRouteHandler/apiRouteHandler";
import { YTQueryResponse } from "../../../utils/services/youtube/searchYoutubeVideo/searchYoutubeVideo";
import StyledSnackBar from "../../_atoms/SnackBar/StyledSnackBar";

const youtubeGetEndpoint = getApiAddress(ApiEndpointsEnum.youtubeId, [
  `0La3aBSjvGY`,
]);

const server = setupServer(
  // todo -- refine typing
  rest.get<DefaultRequestBody, YTQueryResponse>(
    youtubeGetEndpoint,
    (req, res, ctx) => {
      return res(ctx.json({ type: "found" }));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const enabledVideoPlayer = /video-player-enabled/i;
const disabledVideoPlayer = /video-player-disabled/i;
const inputSourceUrl = /input-source-url/i;
const inputSelectSource = /input-select-source-language/i;
const inputSelectTarget = /input-select-target-language/i;
const buttonBuildLesson = /build lesson/i;

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
      expect(screen.getByTestId(inputSelectSource)).toBeDisabled();
    });

    test("targetLanguage selection input is disabled", () => {
      expect(screen.getByTestId(inputSelectTarget)).toBeDisabled();
    });

    test("the submit button is disabled", () => {
      expect(
        screen.getByRole("button", { name: buttonBuildLesson })
      ).toBeDisabled();
    });
  });

  describe("when a user inputs a url for a youtube video", () => {
    describe("if the url is valid", () => {
      beforeEach(() => {
        render(<SelectMedia />);
        render(<StyledSnackBar />);
        user.type(
          screen.getByTestId(inputSourceUrl),
          "https://www.youtube.com/watch?v=0La3aBSjvGY"
        );
        user.click(screen.getByRole("button", { name: /search/i }));
      });
      test("the VideoPlayer activates with the provided content", async () => {
        expect(
          await screen.findByTestId(/video-player-enabled/i)
        ).toBeInTheDocument();
      });

      test("the sourceLanguage input is no longer disabled", async () => {
        await waitFor(() =>
          expect(screen.getByTestId(inputSelectSource)).toBeEnabled()
        );
      });

      test("the targetLanguage input is no longer disabled", async () => {
        await waitFor(() =>
          expect(screen.getByTestId(inputSelectTarget)).toBeEnabled()
        );
      });

      test("the submit button is still disabled", () => {
        expect(
          screen.getByRole("button", { name: buttonBuildLesson })
        ).toBeDisabled();
      });

      test("a success toast message appears", async () => {
        // todo - toast does not exist within component (pages/_app)
        expect(await screen.findByText(/video found/i)).toBeInTheDocument();
      });
    });

    describe("if the url is invalid", () => {
      beforeEach(() => {
        render(<SelectMedia />);
        user.click(screen.getByRole("button", { name: /search/i }));
        user.type(
          screen.getByTestId(inputSourceUrl),
          "https://www.youtube.com/watch?v=invalid"
        );
      });

      test("all other fields remain disabled", () => {
        expect(screen.getByTestId(disabledVideoPlayer)).toBeInTheDocument();
        expect(screen.getByTestId(inputSelectSource)).toBeDisabled();
        expect(screen.getByTestId(inputSelectTarget)).toBeDisabled();
        expect(
          screen.getByRole("button", { name: buttonBuildLesson })
        ).toBeDisabled();
      });

      test.todo("a warning toast message appears");
    });
  });

  describe("when all inputs have values", () => {
    beforeEach(() => {
      render(<SelectMedia />);
      user.type(
        screen.getByTestId(/input-source-url/i),
        "http://localhost:5000/services/youtube/FggwAN76lM0"
      );
      // user.click(screen.getByRole("button", { name: /search/i }));
      // ! the above click event produces a nasty console error in the tests
      // ! that I can't nail down on how to resolve. The tests still passes,
      // ! but the "error" creates a massive block of text. Removing this click
      // ! still works, but it starts to deviate from the exact user flow.
      user.type(screen.getByTestId(inputSelectSource), "en-US");
      const sourceInput = screen.getByTestId("input-select-source-language");
      fireEvent.change(sourceInput, { target: { value: "en-US" } });
      const targetInput = screen.getByTestId("input-select-target-language");
      fireEvent.change(targetInput, { target: { value: "fr" } });
    });

    test("the submit button is no longer disabled", () => {
      expect(
        screen.getByRole("button", { name: buttonBuildLesson })
      ).toBeEnabled();
    });
    describe("when the submit button is clicked", () => {
      test("the submit button changes to the loading variant", async () => {
        const buildButton = screen.getByRole("button", {
          name: buttonBuildLesson,
        });
        user.click(buildButton);
        expect(await screen.findByText(/building lesson/i)).toBeInTheDocument();
      });
      test.todo("once the job is complete, a success snackbar appears");
      test.todo("after a delay, the page changes");
    });
  });
});
