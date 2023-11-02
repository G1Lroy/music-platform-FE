import { create } from "zustand";
interface uiStore {
  isLoading: boolean;
  setIsLoading: (flag: boolean) => void;
}

const uiStore = create<uiStore>((set) => ({
  isLoading: false,
  setIsLoading: (flag) => set((state) => ({ ...state, isLogin: flag })),
}));

export default uiStore;
