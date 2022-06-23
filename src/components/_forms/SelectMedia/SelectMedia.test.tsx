/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../../testing-utils/test-utils";
import { rest, DefaultRequestBody } from "msw";
import { setupServer } from "msw/node";
import SelectMedia, {
  TEST_ID_INPUT_SOURCE_URL,
  TEST_ID_INPUT_SELECT_SOURCE,
  TEST_ID_INPUT_SELECT_TARGET,
  BUTTON_BUILD_LESSON,
} from "./SelectMedia";
import user from "@testing-library/user-event";
import {
  getApiAddress,
  ApiEndpointsEnum,
} from "../../../utils/helpers/apiRouteHandler/apiRouteHandler";
import { YTQueryResponse } from "../../../utils/services/youtube/searchYoutubeVideo/searchYoutubeVideo";
import StyledSnackBar from "../../_atoms/SnackBar/StyledSnackBar";
import {
  IMedia,
  MOCK_MEDIA,
} from "../../../redux/slices/mediaSlice/mediaSlice";
import {
  authorMock,
  MOCK_AUTHOR,
} from "../../../redux/slices/authorSlice/authorSlice";
import { IPostMediaToS3Res } from "../../../utils/services/aws/s3/postMediaToS3/postMediaToS3";
import { ISearchForMediaS3 } from "../../../utils/services/aws/s3/searchForMediaS3/searchForMediaS3";
import {
  TEST_ID_VIDEO_PLAYER_ENABLED,
  TEST_ID_VIDEO_PLAYER_DISABLED,
} from "../../_molecules/VideoPlayer/VideoPlayerView/VideoPlayerView";

const youtubeGetEndpoint = getApiAddress(ApiEndpointsEnum.youtubeId, [
  `0La3aBSjvGY`,
]);
const youtubeGetEndpointFailure = getApiAddress(ApiEndpointsEnum.youtubeId, [
  `00000000000`,
]);
const s3PostEndpoint = getApiAddress(ApiEndpointsEnum.s3);
const s3SearchEndpoint = getApiAddress(ApiEndpointsEnum.s3BucketsIdFilesId, [
  "parakeet-content-bucket-test",
  `0La3aBSjvGY`,
]);

// * TESTING ENDPOINTS
const server = setupServer(
  rest.get<DefaultRequestBody, YTQueryResponse["data"]>(
    youtubeGetEndpoint,
    (req, res, ctx) => {
      return res(
        ctx.json({
          type: "success",
          message: "video found",
          data: {
            content: MOCK_MEDIA,
            author: MOCK_AUTHOR,
          },
        })
      );
    }
  ),

  rest.get<DefaultRequestBody, YTQueryResponse["data"]>(
    youtubeGetEndpointFailure,
    (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          type: "error",
          message: "Whoops, something went wrong.",
        })
      );
    }
  ),

  rest.post<DefaultRequestBody, IPostMediaToS3Res["data"]>(
    s3PostEndpoint,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          type: "success",
          message: "file uploaded.",
          data: {
            mediaFormat: "mp4-mock",
            bucketURI: "s3/mock",
          },
        })
      );
    }
  ),

  // * set root endpoint to failure so it doesn't conflict
  // * with tests uploading "new" files
  rest.get<DefaultRequestBody, ISearchForMediaS3["data"]>(
    s3SearchEndpoint,
    (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          type: "error",
          message: "file not found.",
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// const mediaAddress = "https://www.youtube.com/watch?v=0La3aBSjvGY";

describe("SelectMedia", () => {
  test("on mount", () => {
    render(<SelectMedia />);
    // expect video player to be disabled
    expect(
      screen.getByTestId(TEST_ID_VIDEO_PLAYER_DISABLED)
    ).toBeInTheDocument();
    // expect language mapping inputs to be disabled
    expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeDisabled();
    expect(screen.getByTestId(TEST_ID_INPUT_SELECT_TARGET)).toBeDisabled();
    // expect build lesson to be disabled
    expect(
      screen.getByRole("button", { name: BUTTON_BUILD_LESSON })
    ).toBeDisabled();
  });

  test("When a valid video is selected, the video players displays it and a success message appears", async () => {
    render(<SelectMedia />);
    render(<StyledSnackBar />);
    // enter valid youtube address
    await user.type(
      screen.getByTestId(TEST_ID_INPUT_SOURCE_URL),
      "https://www.youtube.com/watch?v=0La3aBSjvGY"
    );
    // click search button
    await user.click(screen.getByRole("button", { name: /search/i }));
    // expect success snackbar
    await waitFor(() => {
      const successToast = screen.getByText(/video found/i);
      expect(successToast).toBeInTheDocument();
    });
    // expect video player to be enabled
    expect(
      screen.getByTestId(TEST_ID_VIDEO_PLAYER_ENABLED)
    ).toBeInTheDocument();
    // expect language mapping inputs to be enabled
    expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeEnabled();
    expect(screen.getByTestId(TEST_ID_INPUT_SELECT_TARGET)).toBeEnabled();
    // expect build lesson button to be enabled when inputs selected
    expect(screen.getByText(BUTTON_BUILD_LESSON)).toBeInTheDocument();
  });

  test("When an invalid video input is provided, the video players does not display and a failure message appears", async () => {
    render(<SelectMedia />);
    render(<StyledSnackBar />);
    // enter invalid youtube address
    await user.type(screen.getByTestId(TEST_ID_INPUT_SOURCE_URL), "invalid");
    // click search button
    await user.click(screen.getByRole("button", { name: /search/i }));
    // expect failure snackbar
    await waitFor(() => {
      expect(screen.getByText(/invalid address provided/i)).toBeInTheDocument();
    });
    // expect video player to be disabled
    expect(
      screen.getByTestId(TEST_ID_VIDEO_PLAYER_DISABLED)
    ).toBeInTheDocument();
    // expect language mapping inputs to be disabled
    expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeDisabled();
    expect(screen.getByTestId(TEST_ID_INPUT_SELECT_TARGET)).toBeDisabled();
    // expect build lesson button to remain disabled
    expect(
      screen.getByRole("button", { name: BUTTON_BUILD_LESSON })
    ).toBeDisabled();
  });
});

test("When an non-existing video input is provided, the video players does not display and a failure message appears", async () => {
  render(<SelectMedia />);
  render(<StyledSnackBar />);
  // enter non-existing video url
  await user.type(
    screen.getByTestId(TEST_ID_INPUT_SOURCE_URL),
    "https://www.youtube.com/watch?v=00000000000"
  );
  // click search button
  await user.click(screen.getByRole("button", { name: /search/i }));
  // expect failure snackbar
  await waitFor(() => {
    expect(
      screen.getByText("Whoops, something went wrong.")
    ).toBeInTheDocument();
  });
  // expect video player to be disabled
  expect(screen.getByTestId(TEST_ID_VIDEO_PLAYER_DISABLED)).toBeInTheDocument();
  // expect language mapping inputs to be disabled
  expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeDisabled();
  expect(screen.getByTestId(TEST_ID_INPUT_SELECT_TARGET)).toBeDisabled();
  // expect build lesson button to remain disabled
  expect(
    screen.getByRole("button", { name: BUTTON_BUILD_LESSON })
  ).toBeDisabled();
});
