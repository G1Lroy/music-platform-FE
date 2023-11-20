"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlineFileAdd } from "react-icons/ai";
import userStore from "@/store/user";
import authModaStore from "@/store/authModal";
import toast from "react-hot-toast";
import { toastConfig } from "@/const";
import uploadModalStore from "@/store/uploadModal";
import tracksPageStore from "@/store/tracksPage";
import { useEffect } from "react";
import LibraryItem from "./LibraryItem";
import playerStore from "@/store/player";
import { TrackT } from "@/store/tracksPage/model";

interface LibraryProps {}

const Library: React.FC<LibraryProps> = ({}) => {
  const { isLogin, currentUser } = userStore();
  const { tracksByUser, tracks, setTracksByUser } = tracksPageStore();
  const { setIsOpenLogin } = authModaStore();
  const { setIsOpenUpload } = uploadModalStore();
  const { setCurrTrack, setCurrTracksCollection, currTrack } = playerStore();

  const handleClick = (track: TrackT, tracksArray: TrackT[]) => {
    if (currTrack?._id === track._id) return;
    setCurrTrack(track);
    setCurrTracksCollection(tracksArray);
  };

  const handleUpload = () => {
    if (!isLogin) {
      toast("For logged users only!", toastConfig);
      setIsOpenLogin(true);
      return;
    }
    setIsOpenUpload(true);
  };
  useEffect(() => {
    setTracksByUser(getTracksByUser());
  }, [tracks, currentUser]);

  const getTracksByUser = () => tracks.filter((t) => t.userId === currentUser);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-1 pt-2">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlineFileAdd
          onClick={handleUpload}
          size={20}
          className="
            text-neutral-400 
            cursor-pointer 
            hover:text-white 
            hover:scale-125
            transition
          "
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 ">
        {!isLogin ? (
          <div>Log in to see you library</div>
        ) : (
          <>
            {tracksByUser.length ? (
              tracksByUser.map((track) => (
                <LibraryItem onClick={() => handleClick(track, tracksByUser)} key={track._id} track={track} />
              ))
            ) : (
              <div>You dont have upload track</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Library;
