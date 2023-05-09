import { FC, useEffect, useState } from "react";
import { Playlist, useGetPlaylistsQuery } from "../generated";
import { Button } from "antd";

interface TabsProps {
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | undefined>>;
}
const Tabs: FC<TabsProps> = ({ setPlaylist }) => {
  const { data: tabs } = useGetPlaylistsQuery();
  const [select, setSelect] = useState<Playlist>();

  useEffect(() => {
    if (tabs?.getPlaylists && tabs.getPlaylists.length > 0) {
      handleSelectPlaylist(tabs.getPlaylists[0]);
    }
  }, [tabs]);

  const handleSelectPlaylist = (val: Playlist) => {
    setSelect(val);
    setPlaylist(val);
  };
  return (
    <div>
      <img src={require("../assets/logo.png")}></img>
      {tabs?.getPlaylists?.map((val, ind) => {
        return (
          <div key={ind} style={{ margin: 8 }}>
            <Button
              onClick={() => handleSelectPlaylist(val)}
              type="text"
              style={{
                fontSize: 20,
                opacity: select?.id == val.id ? 1 : 0.4,
              }}
            >
              {val.title}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
