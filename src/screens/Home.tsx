import Songs from "./Songs";
import Tabs from "./Tabs";
import Player from "./Player";
import { useEffect, useState } from "react";
import { Playlist, Song } from "../generated";
import Drawer from "@mui/material/Drawer";

const Home = () => {
  const [playlist, setPlaylist] = useState<Playlist>();
  const [song, setSong] = useState<Song>();
  const [open, setOpen] = useState(window.innerWidth > 425 ? false : song ? false : true);

  const [avgColor, setAvgColor] = useState("rgba(0,0,0,1)");
  useEffect(() => {
    if (song) {
      fetch(song.photo)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);

          const img = new Image();
          img.src = url;
          img.setAttribute("crossOrigin", "");

          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0);

              const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );
              const data = imageData.data;

              let r = 0,
                g = 0,
                b = 0;

              for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
              }

              const pixels = data.length / 4;
              const avgR = Math.floor(r / pixels);
              const avgG = Math.floor(g / pixels);
              const avgB = Math.floor(b / pixels);

              const avgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
              setAvgColor(avgColor);
            }
          };
        })
        .catch((e) => {
          setAvgColor("rgb(0,0,0)");
        });
    }
  }, [song]);
  const bgStyle = {
    background: `linear-gradient(to bottom right,${avgColor},rgba(0,0,0,1))`,
  };

  const [nextSong, setNextSong] = useState<Song>();
  const [prevSong, setPrevSong] = useState<Song>();

  const onNext = () => {
    setNextSong(song);
  };
  const onPrev = () => {
    setPrevSong(song);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100dvh",
        backgroundColor: "red",
        ...bgStyle,
      }}
    >
      <div style={{ flex: 0.5, padding: 15 }} className="tabs">
        <Tabs setPlaylist={setPlaylist} />
      </div>
      <div style={{ flex: 1, padding: 15 }} className="songs">
        <Songs
          playlist={playlist}
          setSong={setSong}
          nextSong={nextSong}
          prevSong={prevSong}
        />
      </div>
      <div style={{ flex: 2, padding: 15 }} className="player">
        <Player song={song} onNext={onNext} onPrev={onPrev} />
        <div className="player-search" onClick={()=>setOpen(true)}>
          <img
            style={{ marginRight: 10, height: 25, width: 25 }}
            src={require("../assets/search_icon.png")}
          />
        </div>
      </div>
      <Drawer anchor={"left"} open={open} onClose={()=>setOpen(false)}>
        <div style={{ flex: 1, padding: 15 }}>
          <Songs
            playlist={playlist}
            setSong={(e)=>{
              setSong(e);
              setOpen(false)
            }}
            nextSong={nextSong}
            prevSong={prevSong}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Home;
