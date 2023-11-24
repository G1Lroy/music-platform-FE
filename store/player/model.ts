import { TrackT } from "../tracksPage/model";

export interface IPlayerStore {
  play: boolean;
  volume: number;
  setVolume: (value: number) => void;
  setCurrTrack: (track: TrackT | null) => void;
  setCurrTracksCollection: (tracks: TrackT[], track: TrackT) => void;
  currTrack: TrackT | null;
  currTracksCollection: TrackT[];
  toggleVolume: () => void;
  setPLay: (flag: boolean) => void;
  switchTrack: (type: "next" | "prev") => void;
  duration: number;
  setDuration: (d: number) => void;
  currTime: number;
  setCurrTime: (t: number) => void;
}
