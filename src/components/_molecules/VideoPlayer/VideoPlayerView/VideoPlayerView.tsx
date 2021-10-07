import { styled } from "@mui/material";
import { IVideoPlayerController } from "../VideoPlayerController/VideoPlayerController";

type IVideoPlayerView = IVideoPlayerController;

const VideoPlayerView = ({ embedURL, timeStamp }: IVideoPlayerView) => {
  return (
    <VideoPlayerWrapper>
      <iframe
        width="100%"
        height="100%"
        src={`${embedURL}?autoplay=1&start=${timeStamp?.startTime + 1 || 0}${
          timeStamp?.endTime && `&end=${timeStamp?.endTime}`
        }`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </VideoPlayerWrapper>
  );
};

export default VideoPlayerView;

const VideoPlayerWrapper = styled("div")`
  border: 1px solid red;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;
