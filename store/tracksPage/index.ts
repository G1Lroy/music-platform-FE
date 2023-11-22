import { tracksServise } from "@/apiServise/tracks";
import { create } from "zustand";
import { ITracksPage } from "./model";
import toast from "react-hot-toast";
import { delay } from "@/utils";

const tracksPageStore = create<ITracksPage>((set, get) => ({
  reRenderPage: false,
  tracks: [],
  isTracksLoading: false,
  trackIdToDelete: "",
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
  fetchDeleteTrack: async (id) => {
    set({ trackIdToDelete: id });
    try {
      set({ isTracksLoading: true });
      await delay(500);
      const response = await tracksServise.deleteTrack(id);
      if (response.status === 200) {
        set({ isTracksLoading: false });
        const { fetchTracks } = get();
        fetchTracks();
        await delay(1000);
        toast.success("Track delete!");
      } else {
        toast.error("error!");
      }
    } catch (error) {
      //@ts-ignore
      toast.error(error.response.data.error);
    }
  },
  tracksByUser: [],
  setTracksByUser: (tracks) => {
    set({ tracksByUser: tracks });
  },
}));

export default tracksPageStore;
