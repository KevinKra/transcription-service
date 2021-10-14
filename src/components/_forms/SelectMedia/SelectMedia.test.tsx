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
      return res(ctx.json({ type: "success", message: "mock" }));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const enabledVideoPlayer = /video-player-enabled/i;
const disabledVideoPlayer = /video-player-disabled/i;
const inputMediaUrl = /input-source-url/i;
const inputSelectSource = /input-select-source-language/i;
const inputSelectTarget = /input-select-target-language/i;
const buttonBuildLesson = /build lesson/i;
const mediaAddress = "https://www.youtube.com/watch?v=0La3aBSjvGY";

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
    describe("if the media address input is valid", () => {
      beforeEach(() => {
        render(<SelectMedia />);
        render(<StyledSnackBar />);
        user.type(screen.getByTestId(inputMediaUrl), mediaAddress);
        user.click(screen.getByRole("button", { name: /search/i }));
      });
      test("the VideoPlayer activates with the provided content", async () => {
        expect(
          await screen.findByTestId(enabledVideoPlayer)
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

      test("a success toast message appears", () => {
        const successToast = screen.getByText(/video found/i);
        expect(successToast).toBeInTheDocument();
      });
    });

    describe("if the media address input is invalid", () => {
      beforeEach(() => {
        render(<SelectMedia />);
        render(<StyledSnackBar />);
        user.type(
          screen.getByTestId(inputMediaUrl),
          "https://www.youtube.com/watch?v=invalid"
        );
        user.click(screen.getByRole("button", { name: /search/i }));
      });

      test("the VideoPlayer does not activate", async () => {
        expect(
          await screen.findByTestId(disabledVideoPlayer)
        ).toBeInTheDocument();
      });

      test("all inputs, except the media source input, remain disabled", () => {
        expect(screen.getByTestId(disabledVideoPlayer)).toBeInTheDocument();
        expect(screen.getByTestId(inputSelectSource)).toBeDisabled();
        expect(screen.getByTestId(inputSelectTarget)).toBeDisabled();
        expect(
          screen.getByRole("button", { name: buttonBuildLesson })
        ).toBeDisabled();
      });

      test("a warning toast message appears", () => {
        const warningToast = screen.getByText(/invalid address provided/i);
        expect(warningToast).toBeInTheDocument();
      });
    });

    describe("if the media address input is valid, but the video is not found", () => {
      beforeEach(() => {
        server.use(
          rest.get<DefaultRequestBody, YTQueryResponse>(
            youtubeGetEndpoint,
            (req, res, ctx) => {
              return res(
                // Send a valid HTTP status code
                ctx.status(404),
                // And a response body, if necessary
                ctx.json({
                  type: "warning",
                  message: "Video not found",
                })
              );
            }
          )
        );
        render(<SelectMedia />);
        render(<StyledSnackBar />);
        user.type(screen.getByTestId(inputMediaUrl), mediaAddress);
        user.click(screen.getByRole("button", { name: /search/i }));
      });

      test("the VideoPlayer does not activate", async () => {
        expect(
          await screen.findByTestId(disabledVideoPlayer)
        ).toBeInTheDocument();
      });

      test("a warning snackbar appears", async () => {
        const warningSnackbar = await screen.findByText(/video not found/i);
        expect(warningSnackbar).toBeInTheDocument();
      });

      test.todo("all the fields become enabled");
      test.todo("the previous values are still present");
    });
  });

  describe("when the user selects a source language", () => {
    // beforeEach(() => {
    //   render(<SelectMedia />);
    //   user.type(
    //     screen.getByTestId(inputMediaUrl),
    //     "https://www.youtube.com/watch?v=0La3aBSjvGY"
    //   );
    //   user.click(screen.getByRole("button", { name: /search/i }));
    // });
    test.todo(
      "the selected source language does NOT also appear as a target language option"
    );
  });

  describe("when all inputs have values", () => {
    beforeEach(() => {
      render(<SelectMedia />);
      render(<StyledSnackBar />);
      user.type(screen.getByTestId(inputMediaUrl), mediaAddress);
      const sourceInput = screen.getByTestId("input-select-source-language");
      fireEvent.change(sourceInput, { target: { value: "en-US" } });
      const targetInput = screen.getByTestId("input-select-target-language");
      fireEvent.change(targetInput, { target: { value: "fr" } });
      // todo -- cheating the UX flow in this example, is that okay?
    });

    test("the submit button is no longer disabled", () => {
      expect(
        screen.getByRole("button", { name: buttonBuildLesson })
      ).toBeEnabled();
    });

    describe("and the submit button is clicked", () => {
      test("the submit button changes to the loading variant", async () => {
        const buildButton = screen.getByRole("button", {
          name: buttonBuildLesson,
        });
        user.click(buildButton);
        expect(await screen.findByText(/building lesson/i)).toBeInTheDocument();
      });

      test.todo("all inputs become disabled");

      describe("it's able to handle a successful call", () => {
        test.todo("a success notification appears");
      });
      describe("it's able to handle a failing call", () => {
        test.todo("a failure notification appears");
        test.todo("all inputs become enabled");
      });
    });
  });
});
