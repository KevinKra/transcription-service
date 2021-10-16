import { render, screen } from "../../../../testing-utils/test-utils";
import VideoPlayerView from "./VideoPlayerView";
import user from "@testing-library/user-event";
import StyledSnackBar from "../../../_atoms/SnackBar/StyledSnackBar";

const videoPlayerDisabled = /video-player-disabled/i;
const videoPlayerEnabled = /video-player-enabled/i;
const videoDetails = /video-player-details/i;
const hideDetails = /hide details/i;
const showDetails = /show details/i;

describe("VideoPlayerView", () => {
  describe("when the component mounts", () => {
    describe("if playable is set to false", () => {
      beforeEach(() => {
        render(
          <VideoPlayerView
            playable={false}
            withDetails={true}
            embedURL="123"
            timeStamp={{ startTime: 0, endTime: 10 }}
          />
        );
        render(<StyledSnackBar />);
      });

      test("the player's video section appears in the default no-video format", () => {
        expect(screen.getByTestId(videoPlayerDisabled)).toBeInTheDocument();
      });

      describe("and the withDetails prop is true", () => {
        test("the 'show details' button is disabled", () => {
          expect(
            screen.getByRole("button", { name: showDetails })
          ).toBeDisabled();
        });

        test("the the details section is not visible", () => {
          expect(screen.queryByTestId(videoDetails)).not.toBeInTheDocument();
        });
      });

      describe("if the user clicks the play button", () => {
        test("the player section remains in the default no-video format", () => {
          expect(screen.getByTestId(videoPlayerDisabled)).toBeInTheDocument();
        });

        test("a warning toast message appears", async () => {
          user.click(screen.getByTestId(videoPlayerDisabled));
          expect(
            await screen.findByText(
              /no media has been provided to the video player/i
            )
          ).toBeInTheDocument();
        });
      });
    });

    describe("if playable is set to true", () => {
      beforeEach(() => {
        render(
          <VideoPlayerView
            playable={true}
            withDetails={true}
            embedURL="123"
            timeStamp={{ startTime: 0, endTime: 10 }}
          />
        );
      });

      test("the video automatically plays", () => {
        expect(screen.getByTestId(videoPlayerEnabled)).toBeInTheDocument();
      });

      describe("and the withDetails prop is true", () => {
        test("the player's 'show details' button is enabled", () => {
          expect(
            screen.getByRole("button", { name: showDetails })
          ).toBeEnabled();
        });

        test("the player's details section is not visible by default", () => {
          expect(screen.queryByTestId(videoDetails)).not.toBeInTheDocument();
        });
      });

      describe("if the user clicks the 'show details' button", () => {
        beforeEach(() => {
          user.click(screen.getByRole("button", { name: showDetails }));
        });

        test("the player's details section becomes visible", () => {
          expect(screen.queryByTestId(videoDetails)).toBeInTheDocument();
        });

        test.todo("all fields have values");

        test("'show details' button converts to 'hide details'", () => {
          expect(
            screen.queryByRole("button", { name: hideDetails })
          ).toBeInTheDocument();
          expect(
            screen.queryByRole("button", { name: showDetails })
          ).not.toBeInTheDocument();
        });

        test("the 'hide details' button is enabled", () => {
          expect(
            screen.queryByRole("button", { name: hideDetails })
          ).toBeEnabled();
        });
      });
    });

    describe("if the user clicks the 'hide details' button", () => {
      beforeEach(() => {
        render(
          <VideoPlayerView
            playable={true}
            withDetails={true}
            embedURL="123"
            timeStamp={{ startTime: 0, endTime: 10 }}
          />
        );
        user.click(screen.getByRole("button", { name: showDetails }));
        user.click(screen.getByRole("button", { name: hideDetails }));
      });

      test("the player's details section is no longer visible", () => {
        expect(screen.queryByTestId(videoDetails)).not.toBeInTheDocument();
      });

      test("'hide details' button converts to 'show details'", () => {
        expect(
          screen.queryByRole("button", { name: showDetails })
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("button", { name: hideDetails })
        ).not.toBeInTheDocument();
      });

      test("the 'show details' button is enabled", () => {
        expect(
          screen.queryByRole("button", { name: showDetails })
        ).toBeEnabled();
      });
    });

    describe("if the withDetails prop is false", () => {
      beforeEach(() => {
        render(
          <VideoPlayerView
            playable={true}
            withDetails={false}
            embedURL="123"
            timeStamp={{ startTime: 0, endTime: 10 }}
          />
        );
      });

      test("there is no details button", () => {
        expect(
          screen.queryByRole("button", { name: /show details/i })
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole("button", { name: /hide details/i })
        ).not.toBeInTheDocument();
      });

      test("there is no details section", () => {
        expect(
          screen.queryByTestId(/video-player-details/i)
        ).not.toBeInTheDocument();
      });
    });
  });
});
