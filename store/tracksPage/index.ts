import { tracksServise } from "@/apiServise/tracks";
import { delay } from "@/utils";
import { create } from "zustand";
import { ITracksPage } from "./model";
import toast from "react-hot-toast";

const tracksPageStore = create<ITracksPage>((set) => ({
  reRenderPage: false,
  tracks: [],
  isTracksLoading: false,
  setReRenderPage: () => set((state) => ({ reRenderPage: !state.reRenderPage })),
  fetchTracks: async () => {
    try {
      set({ isTracksLoading: true });
      await delay(1000);
      const { data } = await tracksServise.getTracks();
      set({ tracks: data });
    } catch (e) {
      toast.error("Fetching tracks error");
    } finally {
      set({ isTracksLoading: false });
    }
  },
}));

export default tracksPageStore;
