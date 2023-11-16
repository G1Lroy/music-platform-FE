import { create } from "zustand";
interface uiStore {
  isLoading: boolean;
  setIsLoading: (flag: boolean) => void;
  isFirstRendeProfile: boolean;
  setІsFirstRendeProfile: (flag: boolean) => void;
}

const uiStore = create<uiStore>((set) => ({
  isFirstRendeProfile: true,
  isLoading: false,
  setIsLoading: (flag) => set({ isLoading: flag }),
  setІsFirstRendeProfile: (flag) => set({ isFirstRendeProfile: flag }),
}));

export default uiStore;
