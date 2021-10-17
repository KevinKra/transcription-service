import axios from "axios";
import { mocked } from "ts-jest/utils";
import { AuthorMock } from "../../../../redux/slices/authorSlice/authorSlice";
import { MediaMock } from "../../../../redux/slices/mediaSlice/mediaSlice";
import searchYoutubeVideo, { YTQueryResponse } from "./searchYoutubeVideo";

jest.mock("axios");

const mockedAxios = mocked(axios);
const mockedAxiosGet = mocked(mockedAxios.get);

describe("SearchYoutubeVideo()", () => {
  beforeEach(() => {
    mockedAxiosGet.mockResolvedValue({
      data: {
        type: "success",
        message: "video has been found",
        data: {
          media: MediaMock,
          author: AuthorMock,
        },
      },
    } as YTQueryResponse);
  });

  test("I'm not sure what I'm testing here.", async () => {
    const result = await searchYoutubeVideo("mock");
    expect(result).toStrictEqual({
      type: "success",
      message: "video has been found",
      data: {
        media: MediaMock,
        author: AuthorMock,
      },
    });
  });
});
