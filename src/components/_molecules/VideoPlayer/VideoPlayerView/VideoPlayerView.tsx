import { IVideoPlayerController } from "../VideoPlayerController/VideoPlayerController";
import { Button, styled, Typography } from "@mui/material";
import { useState } from "react";

type IVideoPlayerView = Partial<IVideoPlayerController>;

const VideoPlayerView = ({
  playable = false,
  embedURL,
  timeStamp,
}: IVideoPlayerView) => {
  const [showDetails, setShowDetails] = useState(false);

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
      <DisabledPlayer>
        <p>Inactive</p>
      </DisabledPlayer>
      <Button disabled>Show Details</Button>
    </VideoPlayerWrapper>
  );
};

export default VideoPlayerView;

const VideoPlayerWrapper = styled("div")`
  border: 1px solid red;
  /* background-color: ${({ theme }) => theme.palette.primary.main}; */
`;

const ActivePlayer = styled("div")``;
const DisabledPlayer = styled("div")``;
const DetailsSection = styled("section")``;
