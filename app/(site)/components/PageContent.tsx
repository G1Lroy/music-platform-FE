"use client";

import Loader from "@/components/UI/Loader";
import tracksPageStore from "@/store/tracksPage";
import { useEffect } from "react";

import TrackItem from "./TrackItem";

const PageContent: React.FC = () => {
  const { isTracksLoading, tracks, reRenderPage, fetchTracks } = tracksPageStore();

  useEffect(() => {
    fetchTracks();
  }, [reRenderPage]);

  return (
    <div>

      {isTracksLoading ? (
        <Loader className="w-5 h-5 border-2 border-white" />
      ) : (
        <div
          className="    grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
        >
          {tracks.map((track) => (
            <TrackItem key={track._id} track={track} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageContent;
