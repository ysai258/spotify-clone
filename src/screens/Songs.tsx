import { FC, useEffect, useState } from "react";
import { Playlist, Song, useGetSongsQuery } from "../generated";
import Title from "antd/es/typography/Title";
import { Spin } from "antd";

interface Songsprops {
  playlist: Playlist | undefined;
  setSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
  nextSong: Song | undefined;
  prevSong: Song | undefined;
}
const Songs: FC<Songsprops> = ({ playlist, setSong, nextSong, prevSong }) => {
  const [search, setSearch] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();

  const { data: songs, loading: songLoading } = useGetSongsQuery({
    variables: { playlistId: playlist?.id || 1, search: search },
  });

  const assignSong = (item: Song) => {
    const temp = { ...item };
    setSong(undefined);
    setTimeout(() => {
      setSong(temp);
      setSelectedSong(temp);
    }, 0);
  };

  useEffect(() => {
    if (nextSong && songs) {
      let ind = -1;
      songs?.getSongs.forEach((item, index) => {
        if (ind == index) {
          assignSong(item);
        }
        if (item._id == nextSong?._id) {
          ind = index + 1;
        }
      });
    }
  }, [nextSong]);

  useEffect(() => {
    if (prevSong && songs) {
      let ind = -1;
      [...songs?.getSongs].reverse().forEach((item, index) => {
        if (ind == index) {
          assignSong(item);
        }
        if (item._id == prevSong?._id) {
          ind = index + 1;
        }
      });
    }
  }, [prevSong]);

  return (
    <div>
      <Title style={{ margin: 0, padding: 0 }}>{playlist?.title}</Title>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "repeat",
          flexDirection: "row",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: 8,
          marginTop: 33,
          marginBottom: 32,
        }}
      >
        <input
          placeholder="Search Song , Artist"
          style={{
            border: "none",
            backgroundColor: "inherit",
            flex: 1,
            color: "#FFFFFF",
            padding: 10,
            margin: 5,
          }}
          className="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img
          style={{ marginRight: 10, height: 20, width: 20 }}
          src={require("../assets/search_icon.png")}
        />
      </div>
      <div>
        {songLoading && (
          <div
            style={{
              display: "flex",
              height: "50vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin size="large" />
          </div>
        )}
        {songs?.getSongs.length == 0 ? (
          <div
            style={{
              display: "flex",
              height: "50vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No songs found
          </div>
        ) : (
          <div>
            {songs?.getSongs.map((song) => {
              return (
                <div
                  className="song-container"
                  key={song._id}
                  onClick={() => {
                    assignSong(song);
                  }}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                    marginBottom: 22,
                    borderRadius: 8,
                    background:
                      selectedSong?._id == song._id
                        ? "rgba(255, 255, 255, 0.08)"
                        : "",
                  }}
                >
                  <div>
                    <img
                      style={{ height: 48, width: 48, borderRadius: 56 }}
                      src={song.photo}
                    />
                  </div>
                  <div style={{ flex: 1, marginLeft: 16 }}>
                    <div style={{ fontSize: 18 }}>{song.title}</div>
                    <div style={{ opacity: 0.6, fontSize: 14 }}>
                      {song.artist}
                    </div>
                  </div>
                  <div>
                    {Math.floor(song.duration / 60)}:{song.duration % 60}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Songs;
