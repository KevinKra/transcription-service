import axios from "axios";
import { mocked } from "ts-jest/utils";
import { authorMock } from "../../../../redux/slices/authorSlice/authorSlice";
import { mediaMock } from "../../../../redux/slices/mediaSlice/mediaSlice";
import searchYoutubeVideo, { YTQueryResponse } from "./searchYoutubeVideo";

jest.mock("axios");

const mockedAxios = mocked(axios);
const mockedAxiosGet = mocked(mockedAxios.get);

describe("SearchYoutubeVideo()", () => {
  describe("success response", () => {
    beforeEach(() => {
      mockedAxiosGet.mockResolvedValue({
        data: {
          type: "success",
          message: "video has been found",
          data: {
            content: mediaMock,
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
          content: mediaMock,
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
