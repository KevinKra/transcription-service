import { styled } from "@mui/system";

const VideoPlayerView = () => {
  return (
    <VideoPlayerWrapper>
      <p>video player</p>
    </VideoPlayerWrapper>
  );
};

export default VideoPlayerView;

const VideoPlayerWrapper = styled("div")`
  border: 1px solid red;
`;
