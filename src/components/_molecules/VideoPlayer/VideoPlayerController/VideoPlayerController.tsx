import { setAlert } from "../../../../redux/slices/alertSlice/alertSlice";
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
  return <VideoPlayerView {...props} />;
};

export default VideoPlayerController;
