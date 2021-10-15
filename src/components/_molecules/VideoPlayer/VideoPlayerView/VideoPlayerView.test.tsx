import { render, screen } from "@testing-library/react";
import VideoPlayerView from "./VideoPlayerView";
import user from "@testing-library/user-event";

const detailsSectionTestId = /video-player-details/i;
const hideDetails = /hide details/i;
const showDetails = /show details/i;

jest.mock("react-redux", () => {
  return {
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

describe("VideoPlayerView", () => {
  describe("when the component mounts", () => {
    describe("if no props are provided", () => {
      beforeEach(() => {
        render(<VideoPlayerView />);
      });

      test("the player's video section appears in the default no-video format", () => {
        expect(screen.getByText(/inactive/i)).toBeInTheDocument();
      });

      test("the player's 'show details' button is disabled", () => {
        expect(
          screen.getByRole("button", { name: showDetails })
        ).toBeDisabled();
      });

      test("the player's details section is not visible", () => {
        expect(screen.queryByText(/title/i)).not.toBeInTheDocument();
      });

      describe("if the user clicks the play button", () => {
        test.todo("a warning snackbar appears");
        test.todo("the player section remains in the default no-video format");
      });
    });

    describe("if valid props are provided", () => {
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
        expect(screen.getByText(/active/i)).toBeInTheDocument();
      });

      test("the player's 'show details' button is enabled", () => {
        expect(screen.getByRole("button", { name: showDetails })).toBeEnabled();
      });

      test("the player's details section is not visible by default", () => {
        expect(
          screen.queryByTestId(detailsSectionTestId)
        ).not.toBeInTheDocument();
      });

      describe("if the user clicks the 'show details' button", () => {
        beforeEach(() => {
          user.click(screen.getByRole("button", { name: showDetails }));
        });

        test("the player's details section becomes visible", () => {
          expect(
            screen.queryByTestId(detailsSectionTestId)
          ).toBeInTheDocument();
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
        expect(
          screen.queryByTestId(detailsSectionTestId)
        ).not.toBeInTheDocument();
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

    describe("if the expanding feature is turned off", () => {
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

      test("there is no show details or hide details button", () => {
        expect(
          screen.queryByRole("button", { name: /show details/i })
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
