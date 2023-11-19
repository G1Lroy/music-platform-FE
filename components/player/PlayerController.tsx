import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import LibraryItem from "../library/LibraryItem";
import SliderComponent from "./SliderComponent";
import playerStore from "@/store/player";

let audio;

const PlayerController: React.FC = ({}) => {
  const { volume, setVolume, currTrack, toggleVolume, togglePLay, play, switchTrack, currTracksCollection } =
    playerStore();
  const Icon = play ? BsPauseFill : BsPlayFill;
  const VolumeIcon = !volume ? HiSpeakerXMark : HiSpeakerWave;
  const disabledSwitch = !currTracksCollection.length || currTracksCollection.length === 1;

  const playTrack = () => {};

  return (
    <>
      <div className="flex h-full justify-between gap-x-5 px-2">
        <div className="flex min-w-[260px] items-center">
          <LibraryItem className="bg-neutral-800" track={currTrack!} />
        </div>

        {/* MOBILE */}
        <div
          className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
        >
          <div
            onClick={togglePLay}
            className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>
        {/*  */}

        <div
          className="
            hidden
            h-full
            md:flex 
            justify-start 
            items-center  
            gap-x-4
          "
        >
          <AiFillStepBackward
            onClick={() => switchTrack("prev")}
            size={30}
            className={`
          text-white 
          cursor-pointer 
           hover:text-green-500
          transition
          active:scale-90
          ${disabledSwitch ? "opacity-50 pointer-events-none" : ""}
        `}
          />

          <div
            onClick={togglePLay}
            className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1
              cursor-pointer
              transition
            hover:bg-green-500
            active:scale-90
            "
          >
            <Icon size={30} className="text-black" />
          </div>

          <AiFillStepForward
            onClick={() => switchTrack("next")}
            size={30}
            className={`
          text-white 
          cursor-pointer 
          hover:text-green-500
          transition
          active:scale-90
          ${disabledSwitch ? "opacity-50 pointer-events-none" : ""}
        `}
          />
        </div>

        <div className="hidden md:flex max-w-xl w-full justify-center items-center">
          <SliderComponent value={volume} onChange={(value) => setVolume(value)} />
        </div>

        <div className="hidden md:flex w-min justify-end">
          <div className="flex items-center gap-x-2 w-[120px] relative">
            <VolumeIcon
              onClick={toggleVolume}
              className="active:scale-90 
            cursor-pointer
            transition
            hover:text-green-500"
              size={30}
            />
            <SliderComponent value={volume} onChange={(value) => setVolume(value)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerController;
