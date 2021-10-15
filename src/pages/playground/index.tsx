import SelectMedia from "../../components/_forms/SelectMedia/SelectMedia";
// import VideoPlayerController from "../../components/_molecules/VideoPlayer/VideoPlayerController/VideoPlayerController";

const index = () => {
  return (
    <div>
      <p>playground</p>
      {/* <VideoPlayerController
        playable={true}
        withDetails={true}
        embedURL="abc"
        timeStamp={{ startTime: 0, endTime: 10 }}
      /> */}
      <SelectMedia />
    </div>
  );
};

export default index;
