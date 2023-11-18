import { tracksServise } from "@/apiServise/tracks";
import { delay } from "@/utils";
import toast from "react-hot-toast";
import { create } from "zustand";
import tracksPageStore from "../tracksPage";
import { TrackT } from "../tracksPage/model";

interface IsearhPage {
  isSearchLoading: boolean;
  searhParam: string;
  displayedTracks: TrackT[];
  setSearchParam: (searchQuery: string) => void;
  fetchTracksByQuery: (searchQuery: string) => Promise<void>;
  resetTracks: () => void;
  filterTracksById: (data: { _id: string }[]) => void;
}

const searchPageStore = create<IsearhPage>((set, get) => ({
  isSearchLoading: false,
  searhParam: "",
  displayedTracks: [],
  setSearchParam: (searchQuery) => set({ searhParam: searchQuery }),
  fetchTracksByQuery: async (searchQuery) => {
    try {
      set({ isSearchLoading: true });
      await delay(1500);
      const { data } = await tracksServise.searchTracks(searchQuery);
      get().filterTracksById(data);
    } catch (error) {
      toast.error("No matching tracks");
    } finally {
      set({ isSearchLoading: false });
    }
  },
  resetTracks: () => set({ displayedTracks: [] }),
  filterTracksById: (data) => {
    const { tracks } = tracksPageStore.getState();
    const updatedTracks = tracks.filter((track) => data.some((trackId: { _id: string }) => trackId._id === track._id));
    set({ displayedTracks: updatedTracks });
  },
}));

export default searchPageStore;
