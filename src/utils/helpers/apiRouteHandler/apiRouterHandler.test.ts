import {
  injectPathVariables,
  apiAddress,
  getApiAddress,
  testApiEndpointsEnum,
} from "./apiRouteHandler";

describe("injectPathVariables()", () => {
  it("can inject a single id into a given address", () => {
    const result = injectPathVariables(testApiEndpointsEnum.testId, ["123"]);
    expect(result).toBe("/test/123");
  });
  it("can inject multiple ids into a given address", () => {
    const result = injectPathVariables(testApiEndpointsEnum.testIdTestId, [
      "123",
      "456",
    ]);
    expect(result).toBe("/test/123/test/456");
  });
});

describe("getApiAddress()", () => {
  it("can handle endpoints that do not have path variables", () => {
    const result = getApiAddress(testApiEndpointsEnum.test);
    expect(result).toBe(`${apiAddress}/test`);
  });
  it("will return the desired address if all ids are present", () => {
    const result = getApiAddress(testApiEndpointsEnum.testId, ["123"]);
    expect(result).toBe(`${apiAddress}/test/123`);
  });
  it("ignores extra ids if they are not used by the endpoint", () => {
    const result = getApiAddress(testApiEndpointsEnum.testIdTestId, [
      "123",
      "555",
      "888",
      "999",
    ]);
    expect(result).toBe(`${apiAddress}/test/123/test/555`);
  });
  it("ignores ids if theyre provided for a route that does not need them.", () => {
    const result = getApiAddress(testApiEndpointsEnum.test, ["111"]);
    expect(result).toBe(`${apiAddress}/test`);
  });
  it("returns root address if not enough ids are provided", () => {
    const result = getApiAddress(testApiEndpointsEnum.testIdTestId, ["123"]);
    expect(result).toBe(apiAddress);
  });
  it("returns the root address if endpoint has ids, but none were provided.", () => {
    const result = getApiAddress(testApiEndpointsEnum.testIdTestId);
    expect(result).toBe(`${apiAddress}`);
  });
  it("returns the root address if endpoint has ids, but an empty array was provided.", () => {
    const result = getApiAddress(testApiEndpointsEnum.testIdTestId, []);
    expect(result).toBe(`${apiAddress}`);
  });
});
