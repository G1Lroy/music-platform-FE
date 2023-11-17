import { tracksServise } from "@/apiServise/tracks";
import { create } from "zustand";
import { ITracksPage, TrackT } from "./model";
import toast from "react-hot-toast";
import userStore from "../user";

const tracksPageStore = create<ITracksPage>((set, get) => ({
  reRenderPage: false,
  tracks: [],
  isTracksLoading: false,
  setReRenderPage: () => set((state) => ({ reRenderPage: !state.reRenderPage })),
  fetchTracks: async () => {
    try {
      set({ isTracksLoading: true });
      const { data } = await tracksServise.getTracks();
      set({ tracks: data });
    } catch (e) {
      toast.error("Fetching tracks error");
    } finally {
      set({ isTracksLoading: false });
    }
  },
  tracksByUser: [],
  setTracksByUser: (tracks) => {
    set({ tracksByUser: tracks });
  },
}));

export default tracksPageStore;
