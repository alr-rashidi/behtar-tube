import { getChannelPlaylists } from "@/api/getYTData";
import { PlaylistCard } from "@/components/cards/";
import { ChannelPlaylistsType } from "@/types";
import React from "react";

const Playlists = async ({ channelId }: { channelId: string }) => {
  const data: ChannelPlaylistsType = await getChannelPlaylists(channelId);

  return (
    <section className="mx-auto grid-items">
      {data.playlists.map((playlist) => <PlaylistCard key={playlist.playlistId} playlist={playlist} />)}
    </section>
  );
};

export default Playlists;
