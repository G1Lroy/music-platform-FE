"use client";

import { tracksServise } from "@/apiServise/tracks";
import Loader from "@/components/UI/Loader";
import tracksPageStore from "@/store/tracksPageStore";
import userStore from "@/store/userStore";
import { delay } from "@/utils";
import { useEffect } from "react";
import toast from "react-hot-toast";
import TrackItem from "./TrackItem";

const PageContent: React.FC = () => {
  const { isTracksLoading, setIsTracksLoading, setTracks, tracks, reRenderPage } =
    tracksPageStore();
  const { isLogin } = userStore();
  const fetchTracks = async () => {
    try {
      setIsTracksLoading(true);
      await delay(1500);
      const { data } = await tracksServise.getTracks();
      setTracks(data);
    } catch (error) {
      toast.error("Fetching tracks error");
    } finally {
      setIsTracksLoading(false);
    }
  };
  useEffect(() => {
    if (!isLogin) return;
    fetchTracks();
  }, [isLogin, reRenderPage]);
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
