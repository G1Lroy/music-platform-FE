import { create } from "zustand";
import { IPlayerStore } from "./model";

const playerStore = create<IPlayerStore>((set, get) => ({
  play: false,
  volume: 0.5,
  currTrack: null,
  currTracksCollection: [],
  duration: 0,
  currTime: 0,
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
    if (get().volume) {
      set({ volume: 0 });
    } else {
      set({ volume: 0.5 });
    }
  },
  setPLay: (flag) => {
    set({ play: flag });
  },
  switchTrack: (type) => {
    const { currTracksCollection, currTrack, setCurrTrack, setPLay } = get();
    setPLay(false);
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
  setDuration: (d) => set({ duration: d }),
  setCurrTime: (t) => set({ currTime: t }),
}));
export default playerStore;
