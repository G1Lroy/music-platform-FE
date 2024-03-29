"use client";

import playerStore from "@/store/player";
import PlayerController from "./PlayerController";

const Player: React.FC = () => {
  const { currTrack } = playerStore();

  if (!currTrack) return null;
  return (
    <div
      className="
      select-none
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-1 
        h-[80px] 
        px-3
      "
    >
      <PlayerController />
    </div>
  );
};

export default Player;
