import { IVideoPlayerController } from "../VideoPlayerController/VideoPlayerController";
import { Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { setAlert } from "../../../../redux/slices/alertSlice/alertSlice";

type IVideoPlayerView = Partial<IVideoPlayerController>;

const VideoPlayerView = ({
  playable = false,
  embedURL,
  timeStamp,
}: IVideoPlayerView) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useAppDispatch();

  return playable ? (
    <VideoPlayerWrapper>
      <ActivePlayer>
        <p>Active</p>
      </ActivePlayer>
      <Button onClick={() => setShowDetails((prev) => !prev)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </Button>
      {showDetails && (
        <DetailsSection
          data-testid="video-player-details"
          aria-label="media details"
        >
          <Typography>Title</Typography>
        </DetailsSection>
      )}
    </VideoPlayerWrapper>
  ) : (
    <VideoPlayerWrapper>
      <DisabledPlayer
        onClick={() =>
          dispatch(
            setAlert({
              type: "warning",
              message: "No media selected",
              display: "client-only",
            })
          )
        }
      >
        <p>Inactive</p>
      </DisabledPlayer>
      <Button disabled>Show Details</Button>
    </VideoPlayerWrapper>
  );
};

export default VideoPlayerView;

const VideoPlayerWrapper = styled("div")`
  border: 1px solid red;
`;

const ActivePlayer = styled("div")``;
const DisabledPlayer = styled("div")``;
const DetailsSection = styled("section")``;
