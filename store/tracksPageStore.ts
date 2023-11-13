import { create } from "zustand";
export type TrackT = {
  title: string;
  artist: string;
  audio: string;
  image: string;
  comments: Comment[];
  listenCoiunt: number;
  _id: string;
};
export type Comment = {
  text: string;
  userName: string;
  track_id: string;
};
interface tracksPageStore {
  tracks: TrackT[];
  isTracksLoading: boolean;
  setIsTracksLoading: (flag: boolean) => void;
  setTracks: (data: TrackT[]) => void;
  reRenderPage: boolean;
  setReRenderPage: () => void;
}

const tracksPageStore = create<tracksPageStore>((set, get) => ({
  reRenderPage: false,
  tracks: [],
  isTracksLoading: false,
  setIsTracksLoading: (flag) => set((state) => ({ ...state, isTracksLoading: flag })),
  setTracks: (data) => set((state) => ({ ...state, tracks: data })),
  setReRenderPage: () => set((state) => ({ ...state, reRenderPage: !get().reRenderPage })),
}));

export default tracksPageStore;
