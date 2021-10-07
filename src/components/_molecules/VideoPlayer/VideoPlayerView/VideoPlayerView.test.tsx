import { render } from "@testing-library/react";
import VideoPlayerView from "./VideoPlayerView";

describe("VideoPlayerView", () => {
  describe("when the component mounts", () => {
    beforeEach(() => {
      render(
        <VideoPlayerView
          embedURL="abc"
          timeStamp={{ startTime: 0, endTime: 10 }}
        />
      );
    });
    describe("if no props are provided", () => {
      test("the player's video section appears in the default no-video format", () => {
        expect(1).toBe(2);
      });
      test.todo("the player's 'show details' button is disabled");
      test.todo("the player's details section is not visible");

      describe("if the user clicks the play button", () => {
        test.todo("a warning snackbar appears");
        test.todo("the player section remains in the default no-video format");
      });
    });

    describe("if valid props are provided", () => {
      test.todo("the video automatically plays");
      test.todo("the player's 'show details' button is enabled");
      test.todo("the player's details section is not visible by default");

      describe("if the user clicks the 'show details' button", () => {
        test.todo("the player's details section becomes visible");
        test.todo("all fields have values");
        test.todo("'show details' button converts to 'hide details'");
        test.todo("the 'hide details' button is enabled");
      });

      describe("if the user clicks the 'hide details' button", () => {
        test.todo("the player's details section is no longer visible");
        test.todo("'hide details' button converts to 'show details'");
        test.todo("the 'show details' button is enabled");
      });
    });
  });
});
