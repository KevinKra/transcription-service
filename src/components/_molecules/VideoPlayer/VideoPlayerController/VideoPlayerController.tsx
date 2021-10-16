import { useAppSelector } from "../../../../redux/hooks";
import { selectMedia } from "../../../../redux/slices/mediaSlice/mediaSlice";
import VideoPlayerView from "../VideoPlayerView/VideoPlayerView";

export interface IVideoPlayerController {
  playable: boolean;
  withDetails: boolean;
  embedURL: string;
  timeStamp: {
    startTime: number;
    endTime: number;
  };
}

const VideoPlayerController = (props: IVideoPlayerController) => {
  const media = useAppSelector(selectMedia);

  return <VideoPlayerView {...props} embedURL={media.embed.iframeURL} />;
};

export default VideoPlayerController;
