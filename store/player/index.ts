import { create } from "zustand";
import { TrackT } from "../tracksPage/model";

export interface IPlayerStore {
  play: boolean;
  volume: number;
  setVolume: (value: number) => void;
  setCurrTrack: (track: TrackT) => void;
  setCurrTracksCollection: (tracks: TrackT[]) => void;
  currTrack: TrackT | null;
  currTracksCollection: TrackT[];
  toggleVolume: () => void;
  togglePLay: () => void;
  switchTrack: (type: "next" | "prev") => void;
}

const playerStore = create<IPlayerStore>((set, get) => ({
  play: false,
  volume: 0.5,
  currTrack: null,
  currTracksCollection: [],
  setVolume: (value) => {
    set({ volume: value });
  },
  setCurrTrack: (track) => {
    set({ currTrack: track });
  },
  setCurrTracksCollection: (tracks) => {
    set({ currTracksCollection: tracks });
  },
  toggleVolume: () => {
    if (get().volume) set({ volume: 0 });
    else set({ volume: 1 });
  },
  togglePLay: () => {
    set({ play: !get().play });
  },
  switchTrack: (type) => {
    const { currTracksCollection, currTrack, setCurrTrack } = get();
    if (!currTracksCollection.length || currTracksCollection.length === 1) return;
    const currIdx = currTracksCollection.findIndex((t) => t._id === currTrack?._id);
    if (type === "next") {
      const nextTrack = currTracksCollection[currIdx + 1];
      if (!nextTrack) return setCurrTrack(currTracksCollection[0]);
      return setCurrTrack(nextTrack);
    }
    if (type === "prev") {
      const prevTrack = currTracksCollection[currIdx - 1];
      if (!prevTrack) return setCurrTrack(currTracksCollection[currTracksCollection.length - 1]);
      return setCurrTrack(prevTrack);
    }
  },
}));
export default playerStore;
