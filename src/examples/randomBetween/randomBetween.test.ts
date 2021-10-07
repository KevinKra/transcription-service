import { randomBetween } from "./randomBetween";

const randomSpy = jest.spyOn(Math, "random");

describe("randomBetween", () => {
  afterEach(() => {
    randomSpy.mockClear();
  });

  describe("when Math.random() returns 0", () => {
    beforeEach(() => {
      // ? find a way to mock Math.random to 0
      randomSpy.mockReturnValue(0);
    });

    test("called with min=3 and max=5 returns 3", () => {
      expect(randomBetween(3, 5)).toEqual(3);
      expect(randomSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("when Math.random() returns 0.5", () => {
    beforeEach(() => {
      randomSpy.mockReturnValue(0);
    });

    test("called with min=3 and max=5 returns 4", () => {
      expect(randomBetween(3, 5)).toEqual(3);
      expect(randomSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("when Math.random() returns 0.9999", () => {
    beforeEach(() => {
      randomSpy.mockImplementation(() => 0.9999);
    });

    test("called with min=3 and max=5 returns 5", () => {
      expect(randomBetween(3, 5)).toEqual(5);
      expect(randomSpy).toHaveBeenCalledTimes(1);
    });
  });
});
