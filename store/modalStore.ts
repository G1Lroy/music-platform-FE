import { create } from "zustand";

interface modalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const modalStore = create<modalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default modalStore;
