import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import LibraryItem from "../library/LibraryItem";
import SliderComponent from "./SliderComponent";
import playerStore from "@/store/player";
import { useEffect, useState } from "react";
import { formatTime } from "@/utils";
import "./../../assets/Play.css";
let audio: HTMLAudioElement;

const PlayerController = () => {
  const {
    volume,
    setVolume,
    currTrack,
    toggleVolume,
    togglePLay,
    play,
    switchTrack,
    currTracksCollection,
    duration,
    setDuration,
    currTime,
    setCurrTime,
  } = playerStore();
  const Icon = play ? BsPauseFill : BsPlayFill;
  const VolumeIcon = !volume ? HiSpeakerXMark : HiSpeakerWave;
  const disabledSwitch = currTracksCollection.length <= 1;
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const playTrack = () => {
    if (!play) {
      audio.play();
    } else {
      audio.pause();
    }
    togglePLay();
  };
  const setTrack = async () => {
    if (currTrack) {
      audio.src = "http://localhost:5000/" + currTrack.audio;
      audio.onloadedmetadata = () => setDuration(audio.duration);
      audio.ontimeupdate = () => setCurrTime(audio.currentTime);
    }
  };
  const changeTrackProgress = (value: number) => {
    setCurrTime(value);
    audio.currentTime = value;
  };
  useEffect(() => {
    if (!audio) audio = new Audio();
    setTrack();
    playTrack();
  }, [currTrack]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (duration === currTime) {
      switchTrack("next");
    }
  }, [currTime]);

  return (
    <>
      <div className="flex h-full justify-between gap-x-5 px-2">
        {/* TRACK ITEM */}
        <div className="flex min-w-[260px] items-center relative">
          <LibraryItem className="bg-neutral-800" track={currTrack!} />
          {play && (
            <div className="playing absolute right-3">
              <span className="playing__bar playing__bar1"></span>
              <span className="playing__bar playing__bar2"></span>
              <span className="playing__bar playing__bar3"></span>
              <span className="playing__bar playing__bar2"></span>
              <span className="playing__bar playing__bar1"></span>
              <span className="playing__bar playing__bar3"></span>
            </div>
          )}
        </div>
        {/*  */}

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

        {/* MAIN CONTROLS */}
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
            onClick={() => {
              playTrack();
            }}
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
        {/*  */}

        {/* TRACK PROGRESS */}
        <div className="hidden md:flex max-w-xl w-full justify-center items-center relative">
          <div className="absolute top-4 left-0 text-xs text-green-500">{formatTime(currTime)}</div>
          <SliderComponent
            value={currTime}
            onChange={(value) => changeTrackProgress(value)}
            step={0.1}
            max={duration}
          />
          <div className="absolute bottom-4 right-0 text-xs text-green-500">{formatTime(duration)}</div>
        </div>
        {/*  */}

        {/* VOLUME CONTROLS */}
        <div className="hidden md:flex w-min justify-end">
          <div
            onMouseEnter={() => setIsVolumeVisible(true)}
            onMouseLeave={() => setIsVolumeVisible(false)}
            className="flex items-center gap-x-2 w-[120px] relative"
          >
            <VolumeIcon
              onClick={toggleVolume}
              className="active:scale-90 
            cursor-pointer
            transition
            hover:text-green-500"
              size={30}
            />
            {isVolumeVisible && (
              <div className="absolute top-4 left-[50%] text-xs text-green-500">{(volume * 100).toFixed()}%</div>
            )}
            <SliderComponent value={volume} onChange={(value) => setVolume(value)} step={0.01} max={1} />
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default PlayerController;
