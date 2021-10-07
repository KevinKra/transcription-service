import VideoPlayerController from "../../components/_molecules/VideoPlayer/VideoPlayerController/VideoPlayerController";

const index = () => {
  return (
    <div>
      <p>playground</p>
      <VideoPlayerController
        playable={true}
        embedURL="abc"
        timeStamp={{ startTime: 0, endTime: 10 }}
      />
    </div>
  );
};

export default index;
