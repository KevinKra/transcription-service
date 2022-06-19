import { IVideoPlayerController } from "../VideoPlayerController/VideoPlayerController";
import { Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { setAlert } from "../../../../redux/slices/alertSlice/alertSlice";

type IVideoPlayerView = IVideoPlayerController;

// * variables used for testing
export const TEST_ID_VIDEO_PLAYER_ENABLED = "video-player-enabled";
export const TEST_ID_VIDEO_PLAYER_DISABLED = "video-player-disabled";
export const TEST_ID_VIDEO_PLAYER_DETAILS = "video-player-details";

const VideoPlayerView = ({
  playable = false,
  withDetails,
  timeStamp,
  embedURL,
}: IVideoPlayerView) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useAppDispatch();

  // todo -- test the withDetails playable behaviors

  return playable ? (
    <VideoPlayerWrapper>
      <ActivePlayer data-testid={TEST_ID_VIDEO_PLAYER_ENABLED}>
        <iframe
          width="100%"
          height="100%"
          src={`${embedURL}?autoplay=1&start=${timeStamp.startTime + 1 || 0}${
            timeStamp.endTime && `&end=${timeStamp.endTime}`
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </ActivePlayer>
      {withDetails && (
        <DetailsSection>
          <Button onClick={() => setShowDetails((prev) => !prev)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
          {showDetails && (
            <DetailsExpand
              data-testid={TEST_ID_VIDEO_PLAYER_DETAILS}
              aria-label="media details"
            >
              <Typography>Title</Typography>
            </DetailsExpand>
          )}
        </DetailsSection>
      )}
    </VideoPlayerWrapper>
  ) : (
    <VideoPlayerWrapper>
      <DisabledPlayer
        data-testid={TEST_ID_VIDEO_PLAYER_DISABLED}
        onClick={() =>
          dispatch(
            setAlert({
              type: "warning",
              message: "No media has been provided to the video player.",
              display: "client-only",
            })
          )
        }
      >
        <p>Inactive</p>
      </DisabledPlayer>
      {withDetails && <Button disabled>Show Details</Button>}
    </VideoPlayerWrapper>
  );
};

export default VideoPlayerView;

const VideoPlayerWrapper = styled("div")`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Player = styled("div")`
  display: grid;
  place-items: center;
  height: 275px;
`;

const ActivePlayer = styled(Player)``;
const DisabledPlayer = styled(Player)``;

const DetailsSection = styled("section")`
  border: 1px solid red;
`;

const DetailsExpand = styled("div")`
  border: 1px solid blue;
`;
