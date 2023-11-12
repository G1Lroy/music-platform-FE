import { create } from "zustand";

interface uploadModaStore {
  isFileLoading: boolean;
  isOpenUpload: boolean;
  setIsOpenUpload: (flag: boolean) => void;
  onClose: () => void;
  setIsFileLoading: (flag: boolean) => void;
}

const uploadModalStore = create<uploadModaStore>((set) => ({
  isFileLoading: false,
  isOpenUpload: false,
  setIsOpenUpload: (flag) => set((state) => ({ ...state, isOpenUpload: flag })),
  onClose: () => set((state) => ({ ...state, isOpenUpload: false })),
  setIsFileLoading: (flag) => set((state) => ({ ...state, isFileLoading: flag })),
}));

export default uploadModalStore;
