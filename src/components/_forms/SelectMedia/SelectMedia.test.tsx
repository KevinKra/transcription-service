import { render } from "@testing-library/react";
import SelectMedia from "./SelectMedia";

describe("SelectMedia", () => {
  describe("when the component mounts", () => {
    beforeEach(() => {
      render(<SelectMedia />);
    });
    test.todo("no video is selected");
    test.todo("the source url input is enabled");
    test.todo("no sourceLanguage input is disabled");
    test.todo("no targetLanguage input is disabled");
    test.todo("the submit button is disabled");
  });
  describe("when a user inputs a url for a youtube video", () => {
    describe("if the url is valid", () => {
      test.todo("the VideoPlayer activates with the provided content");
      test.todo("a success snackbar appears");
      test.todo("the sourceLanguage input is no longer disabled");
      test.todo("the targetLanguage input is no longer disabled");
      test.todo("the submit button is still disabled");
    });
    describe("if the url is invalid", () => {
      test.todo("the VideoPlayer does not activate");
      test.todo("a failure snackbar appears");
      test.todo("the sourceLanguage remains disabled");
      test.todo("the targetLanguage remains disabled");
      test.todo("the submit button remains disabled");
    });
  });
  describe("when all inputs have values", () => {
    test.todo("the submit button is no longer disabled");
    describe("when the submit button is clicked", () => {
      test.todo("the submit button changes to the loading variant");
      test.todo("once the job is complete, a success snackbar appears");
      test.todo("after a delay, the page changes");
    });
  });
});
