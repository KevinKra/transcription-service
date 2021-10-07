import { styled } from "@mui/material";

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
  background-color: ${({ theme }) => theme.palette.primary.main};
`;
