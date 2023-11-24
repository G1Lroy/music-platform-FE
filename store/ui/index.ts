import { create } from "zustand";
interface uiStore {
  isFirstRendeProfile: boolean;
  setІsFirstRendeProfile: (flag: boolean) => void;
}

const uiStore = create<uiStore>((set) => ({
  isFirstRendeProfile: true,
  setІsFirstRendeProfile: (flag) => set({ isFirstRendeProfile: flag }),
}));

export default uiStore;
