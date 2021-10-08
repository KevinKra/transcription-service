import { IVideoPlayerController } from "../VideoPlayerController/VideoPlayerController";
import { Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { setAlert } from "../../../../redux/slices/alertSlice/alertSlice";

type IVideoPlayerView = Partial<IVideoPlayerController>;

const VideoPlayerView = ({
  playable = false,
  withDetails,
  embedURL,
  timeStamp,
}: IVideoPlayerView) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useAppDispatch();

  return playable ? (
    <VideoPlayerWrapper>
      <ActivePlayer data-testid="video-player-enabled">
        <p>Active</p>
      </ActivePlayer>
      {withDetails && (
        <DetailsSection>
          <Button onClick={() => setShowDetails((prev) => !prev)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
          {showDetails && (
            <DetailsExpand
              data-testid="video-player-details"
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
        data-testid="video-player-disabled"
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
  width: 450px;
`;

const Player = styled("div")`
  display: grid;
  place-items: center;
  border: 1px solid blue;
  height: 300px;
  width: 450px;
`;
const ActivePlayer = styled(Player)``;
const DisabledPlayer = styled(Player)``;

const DetailsSection = styled("section")`
  border: 1px solid red;
`;

const DetailsExpand = styled("div")`
  border: 1px solid blue;
`;
