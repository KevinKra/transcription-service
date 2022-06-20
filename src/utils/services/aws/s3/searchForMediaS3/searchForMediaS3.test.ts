import axios from "axios";
import { createMock } from "ts-jest-mock";
import { ISearchForMediaS3, searchForMediaS3 } from "./searchForMediaS3";

jest.mock("axios");

const mockedAxios = createMock(axios);
const mockedAxiosGet = createMock(mockedAxios.get);

describe("searchForMediaS3()", () => {
  describe("success response", () => {
    beforeEach(() => {
      mockedAxiosGet.mockResolvedValue({
        data: {
          type: "success",
          message: "file exists.",
          data: {
            mediaFormat: "mp4",
            bucketURI: "s3...",
          },
        },
      } as ISearchForMediaS3);
    });

    test("handles success", async () => {
      const result = await searchForMediaS3("mock");
      expect(result).toStrictEqual({
        type: "success",
        message: "file exists.",
        data: {
          mediaFormat: "mp4",
          bucketURI: "s3...",
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
            message: "process failed.",
          },
        } as ISearchForMediaS3,
      });
    });

    test("handles failure", async () => {
      const result = await searchForMediaS3("mock");
      expect(result).toStrictEqual({
        type: "error",
        message: "process failed.",
      });
    });
  });

  describe("failure response -- incoming type mismatch", () => {
    beforeEach(() => {
      mockedAxiosGet.mockRejectedValue({});
    });

    test("handles failure edge case", async () => {
      const result = await searchForMediaS3("mock");
      expect(result).toStrictEqual({
        type: "error",
        message: "Oops, something went wrong.",
      });
    });
  });
});
