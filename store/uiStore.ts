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
  setIsLoading: (flag) => set((state) => ({ ...state, isLogin: flag })),
  setІsFirstRendeProfile: (flag) => set((state) => ({ ...state, isFirstRendeProfile: flag })),
}));

export default uiStore;
