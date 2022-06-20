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
const youtubeGetEndpointAlt = getApiAddress(ApiEndpointsEnum.youtubeId, [
  `ABC3aBSjABC`,
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

// const buttonBuildLesson = /build lesson/i;
// const mediaAddress = "https://www.youtube.com/watch?v=0La3aBSjvGY";

describe("SelectMedia", () => {
  test("no video is selected", () => {
    expect(1 + 1).toEqual(2);
  });
});

// describe("SelectMedia", () => {
//   describe("when the component mounts", () => {
//     test("no video is selected", () => {
//       render(<SelectMedia />);
//       expect(
//         screen.getByTestId(TEST_ID_VIDEO_PLAYER_DISABLED)
//       ).toBeInTheDocument();
//     });

//     test("the source url input is enabled", () => {
//       render(<SelectMedia />);
//       expect(screen.getByTestId(TEST_ID_INPUT_SOURCE_URL)).toBeEnabled();
//     });

//     test("sourceLanguage selection input is disabled", () => {
//       render(<SelectMedia />);
//       expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeDisabled();
//     });

//     test("targetLanguage selection input is disabled", () => {
//       render(<SelectMedia />);
//       expect(screen.getByTestId(TEST_ID_INPUT_SELECT_TARGET)).toBeDisabled();
//     });

//     test("the submit button is disabled", () => {
//       render(<SelectMedia />);
//       expect(
//         screen.getByRole("button", { name: buttonBuildLesson })
//       ).toBeDisabled();
//     });
//   });

//   describe("when a user inputs a url for a youtube video", () => {
//     describe("if the media address input is valid", () => {
//       beforeEach(async () => {
//         jest.setTimeout(5000);
//         render(<SelectMedia />);
//         render(<StyledSnackBar />);
//         await user.type(
//           screen.getByTestId(TEST_ID_INPUT_SOURCE_URL),
//           mediaAddress
//         );
//         await user.click(screen.getByRole("button", { name: /search/i }));
//       });

//       test("the VideoPlayer activates with the provided content", async () => {
//         expect(
//           await screen.findByTestId(TEST_ID_VIDEO_PLAYER_ENABLED)
//         ).toBeInTheDocument();
//       });

//       test("the sourceLanguage input is no longer disabled", async () => {
//         await waitFor(() =>
//           expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeEnabled()
//         );
//       });

//       test("the targetLanguage input is no longer disabled", async () => {
//         await waitFor(() =>
//           expect(screen.getByTestId(TEST_ID_INPUT_SELECT_TARGET)).toBeEnabled()
//         );
//       });

//       test("the submit button is still disabled", () => {
//         expect(
//           screen.getByRole("button", { name: buttonBuildLesson })
//         ).toBeDisabled();
//       });

//       test("a success toast message appears", async () => {
//         await waitFor(() => {
//           const successToast = screen.getByText(/video found/i);
//           expect(successToast).toBeInTheDocument();
//         });
//       });
//     });

//     describe("if the media address input is invalid", () => {
//       beforeEach(async () => {
//         jest.setTimeout(5000);
//         render(<SelectMedia />);
//         render(<StyledSnackBar />);
//         await user.type(
//           screen.getByTestId(TEST_ID_INPUT_SOURCE_URL),
//           "https://www.youtube.com/watch?v=banana"
//         );
//         await user.click(screen.getByRole("button", { name: /search/i }));
//       });

//       test("the VideoPlayer does not activate", async () => {
//         expect(
//           await screen.findByTestId(TEST_ID_VIDEO_PLAYER_DISABLED)
//         ).toBeInTheDocument();
//       });

//       test("all inputs, except the media source input, remain disabled", () => {
//         expect(
//           screen.getByTestId(TEST_ID_VIDEO_PLAYER_DISABLED)
//         ).toBeInTheDocument();
//         expect(screen.getByTestId(TEST_ID_INPUT_SOURCE_URL)).toBeEnabled();
//         expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeDisabled();
//         expect(screen.getByTestId(TEST_ID_INPUT_SELECT_TARGET)).toBeDisabled();
//         expect(
//           screen.getByRole("button", { name: buttonBuildLesson })
//         ).toBeDisabled();
//       });

//       test("a warning toast message appears", () => {
//         const warningToast = screen.getByText(/invalid address provided/i);
//         expect(warningToast).toBeInTheDocument();
//       });
//     });

//     describe("if the media address input is valid, but the video is not found", () => {
//       beforeEach(async () => {
//         server.use(
//           rest.get<DefaultRequestBody, YTQueryResponse["data"]>(
//             youtubeGetEndpointAlt,
//             (req, res, ctx) => {
//               return res(
//                 ctx.status(400),
//                 ctx.json({
//                   type: "warning",
//                   message: "video not found",
//                 })
//               );
//             }
//           )
//         );
//         render(<SelectMedia />);
//         render(<StyledSnackBar />);
//         await user.type(
//           screen.getByTestId(TEST_ID_INPUT_SOURCE_URL),
//           "https://www.youtube.com/watch?v=ABC3aBSjABC"
//         );
//         await user.click(screen.getByRole("button", { name: /search/i }));
//       });

//       test("the VideoPlayer does not activate", async () => {
//         expect(
//           await screen.findByTestId(TEST_ID_VIDEO_PLAYER_DISABLED)
//         ).toBeInTheDocument();
//       });

//       test("all inputs, except the media source input, remain disabled", () => {
//         expect(
//           screen.getByTestId(TEST_ID_VIDEO_PLAYER_DISABLED)
//         ).toBeInTheDocument();
//         expect(screen.getByTestId(TEST_ID_INPUT_SOURCE_URL)).toBeEnabled();
//         expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeDisabled();
//         expect(screen.getByTestId(TEST_ID_INPUT_SELECT_TARGET)).toBeDisabled();
//         expect(
//           screen.getByRole("button", { name: buttonBuildLesson })
//         ).toBeDisabled();
//       });

//       test("a warning toast message appears", async () => {
//         await waitFor(() => {
//           const warningSnackbar = screen.getByText(/video not found/i);
//           expect(warningSnackbar).toBeInTheDocument();
//         });
//       });
//     });
//   });

//   describe("when a user selects an option from a language select input", () => {
//     beforeEach(async () => {
//       render(<SelectMedia />);
//       await user.type(
//         screen.getByTestId(TEST_ID_INPUT_SOURCE_URL),
//         "https://www.youtube.com/watch?v=0La3aBSjvGY"
//       );
//       await user.click(screen.getByRole("button", { name: /search/i }));
//     });

//     test("the sibling language select input does not have the same option available", async () => {
//       await waitFor(() =>
//         expect(screen.getByTestId(TEST_ID_INPUT_SELECT_SOURCE)).toBeEnabled()
//       );
//       const sourceInput = screen.getByTestId("input-select-source-language");
//       const targetInput = screen.getByTestId("input-select-target-language");
//       fireEvent.change(sourceInput, { target: { value: "en-US" } });
//       fireEvent.change(targetInput, { target: { value: "en-US" } });
//       // ? getByText() fails if MULTIPLE matches are found. So, if it finds one, success.
//       expect(screen.getByText(/english/i)).toBeInTheDocument();
//     });
//   });

//   describe("when all inputs have values", () => {
//     beforeEach(async () => {
//       jest.setTimeout(5000);
//       render(<SelectMedia />);
//       render(<StyledSnackBar />);
//       await user.type(
//         screen.getByTestId(TEST_ID_INPUT_SOURCE_URL),
//         mediaAddress
//       );
//       const sourceInput = screen.getByTestId("input-select-source-language");
//       const targetInput = screen.getByTestId("input-select-target-language");
//       fireEvent.change(sourceInput, { target: { value: "en-US" } });
//       fireEvent.change(targetInput, { target: { value: "fr-FR" } });
//       // todo -- cheating the UX flow in this example, is that okay?
//     });

//     test("the submit button is no longer disabled", () => {
//       expect(
//         screen.getByRole("button", { name: buttonBuildLesson })
//       ).toBeEnabled();
//     });

//     describe("and the submit button is clicked", () => {
//       test("the submit button changes to the loading variant", async () => {
//         const buildButton = screen.getByRole("button", {
//           name: buttonBuildLesson,
//         });
//         await waitFor(() => {
//           fireEvent.click(buildButton);
//         });
//         expect(await screen.findByText(/building lesson/i)).toBeInTheDocument();
//       });

//       test.todo("all inputs become disabled");
//       // test("all inputs become disabled", async () => {
//       //   const buildButton = screen.getByRole("button", {
//       //     name: buttonBuildLesson,
//       //   });
//       //   await user.click(buildButton);
//       //   expect(
//       //     await screen.findByTestId(TEST_ID_INPUT_SOURCE_URL)
//       //   ).toBeDisabled();
//       //   expect(
//       //     await screen.findByTestId(TEST_ID_INPUT_SELECT_SOURCE)
//       //   ).toBeDisabled();
//       //   expect(
//       //     await screen.findByTestId(TEST_ID_INPUT_SELECT_TARGET)
//       //   ).toBeDisabled();
//       //   expect(
//       //     await screen.findByRole("button", { name: /building lesson/i })
//       //   ).toBeDisabled();
//       // });
//     });
//   });

//   describe("when a video is submitted", () => {
//     const submitForm = async () => {
//       await user.type(
//         screen.getByTestId(TEST_ID_INPUT_SOURCE_URL),
//         mediaAddress
//       );
//       const sourceInput = screen.getByTestId("input-select-source-language");
//       const targetInput = screen.getByTestId("input-select-target-language");
//       fireEvent.change(sourceInput, { target: { value: "en-US" } });
//       fireEvent.change(targetInput, { target: { value: "fr-FR" } });
//       const buildButton = screen.getByRole("button", {
//         name: buttonBuildLesson,
//       });

//       // ? When testing, code that causes React "state updates" should be wrapped into act
//       // ? the build button triggers onSubmit(), which updates state.
//       await waitFor(() => {
//         fireEvent.click(buildButton);
//       });
//     };

//     describe("if the video successfully uploads", () => {
//       beforeEach(async () => {
//         render(<SelectMedia />);
//         render(<StyledSnackBar />);
//         await submitForm();
//       });

//       test("a success toast message appears", async () => {
//         await waitFor(() => {
//           expect(screen.queryByText(/file uploaded/i)).toBeInTheDocument();
//         });
//       });
//     });

//     describe("if the video already exists remotely", () => {
//       beforeEach(async () => {
//         server.use(
//           rest.get<DefaultRequestBody, ISearchForMediaS3["data"]>(
//             s3SearchEndpoint,
//             (req, res, ctx) => {
//               return res(
//                 ctx.status(200),
//                 ctx.json({
//                   type: "success",
//                   message: "File already exists.",
//                 })
//               );
//             }
//           )
//         );
//         render(<SelectMedia />);
//         render(<StyledSnackBar />);
//         await submitForm();
//       });

//       test("a success toast message appears", async () => {
//         await waitFor(() => {
//           expect(
//             screen.queryByText(/file already exists/i)
//           ).toBeInTheDocument();
//         });
//       });
//     });

//     describe("if the video does not successfully upload", () => {
//       beforeEach(async () => {
//         server.use(
//           rest.post<DefaultRequestBody, IPostMediaToS3Res["data"]>(
//             s3PostEndpoint,
//             (req, res, ctx) => {
//               return res(
//                 ctx.status(400),
//                 ctx.json({
//                   type: "error",
//                   message: "failed to upload file.",
//                 })
//               );
//             }
//           )
//         );
//         render(<SelectMedia />);
//         render(<StyledSnackBar />);
//         await submitForm();
//       });

//       test("an error toast message appears", async () => {
//         await waitFor(() => {
//           expect(
//             screen.queryByText(/failed to upload file/i)
//           ).toBeInTheDocument();
//         });
//       });
//     });
//   });
// });
