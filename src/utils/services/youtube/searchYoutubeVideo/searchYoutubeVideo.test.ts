import axios from "axios";
import { mocked } from "ts-jest/utils";
import searchYoutubeVideo, { YTQueryResponse } from "./searchYoutubeVideo";

jest.mock("axios");

const mockedAxios = mocked(axios);
const mockedAxiosGet = mocked(mockedAxios.get);

interface YTQueryResponseMock extends Omit<YTQueryResponse, "data"> {
  data?: {
    media: string;
    author: string;
  };
}

describe("SearchYoutubeVideo()", () => {
  beforeEach(() => {
    mockedAxiosGet.mockResolvedValue({
      type: "success",
      message: "video has been found",
      data: {
        media: "mock",
        author: "mock",
      },
    } as YTQueryResponseMock);
  });
  test.skip("that I can make this work", async () => {
    const result = await searchYoutubeVideo("abc");
    expect(result).toBe(true);
  });
});
