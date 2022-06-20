import axios from "axios";
import { createMock } from "ts-jest-mock";
import { authorMock } from "../../../../redux/slices/authorSlice/authorSlice";
import { MOCK_MEDIA } from "../../../../redux/slices/mediaSlice/mediaSlice";
import searchYoutubeVideo, { YTQueryResponse } from "./searchYoutubeVideo";

jest.mock("axios");

const mockedAxios = createMock(axios);
const mockedAxiosGet = createMock(mockedAxios.get);

afterEach(() => {
  jest.resetAllMocks();
});

describe("SearchYoutubeVideo()", () => {
  describe("success response", () => {
    beforeEach(() => {
      mockedAxiosGet.mockResolvedValue({
        data: {
          type: "success",
          message: "video has been found",
          data: {
            content: MOCK_MEDIA,
            author: authorMock,
          },
        },
      } as YTQueryResponse);
    });

    test("handles success", async () => {
      const result = await searchYoutubeVideo("mock");
      expect(result).toStrictEqual({
        type: "success",
        message: "video has been found",
        data: {
          content: MOCK_MEDIA,
          author: authorMock,
        },
      });
    });
  });

  describe("failure response", () => {
    beforeEach(() => {
      mockedAxiosGet.mockRejectedValue({
        response: {
          data: {
            type: "error",
            message: "video has not been found",
          },
        } as YTQueryResponse,
      });
    });

    test("handles failure", async () => {
      const result = await searchYoutubeVideo("mock");
      expect(result).toStrictEqual({
        type: "error",
        message: "video has not been found",
      });
    });
  });
});
