import { FC } from "react";
import { Song } from "../generated";
import Title from "antd/es/typography/Title";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface PlayerProps {
  song: Song | undefined;
  onNext: () => void;
  onPrev: () => void;
}
const Player: FC<PlayerProps> = ({ song, onNext, onPrev }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
      }}
    >
      {song && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ alignSelf: "flex-start" }}>
            <Title style={{ margin: 0, padding: 0 }}>{song.title}</Title>
            <div style={{ opacity: 0.6 }}>{song.artist}</div>
          </div>
          <img
            src={song.photo}
            style={{ height: "65dvh", width: "100%", marginTop: 32 }}
            alt={song.title}
          />
          <AudioPlayer
            autoPlay={true}
            style={{
              width: "100%",
              backgroundColor: "inherit",
              boxShadow: "none",
            }}
            src={song?.url}
            showSkipControls={true}
            onClickPrevious={() => {
              onPrev();
            }}
            onClickNext={() => {
              onNext();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Player;
