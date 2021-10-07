import { setAlert } from "../../../../redux/slices/alertSlice/alertSlice";
import VideoPlayerView from "../VideoPlayerView/VideoPlayerView";

export interface IVideoPlayerController {
  playable: boolean;
  embedURL: string;
  timeStamp: {
    startTime: number;
    endTime: number;
  };
}

const VideoPlayerController = (props: IVideoPlayerController) => {
  return (
    <div>
      <VideoPlayerView {...props} />
    </div>
  );
};

export default VideoPlayerController;
