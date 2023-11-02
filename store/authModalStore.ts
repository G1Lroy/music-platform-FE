import { create } from "zustand";

interface authModaStore {
  isOpenLogin: boolean;
  setIsOpenLogin: (flag: boolean) => void;
  isOpenRegister: boolean;
  setIsOpenRegister: (flag: boolean) => void;
  onClose: () => void;
}

const authModaStore = create<authModaStore>((set) => ({
  isOpenLogin: false,
  setIsOpenLogin: (flag) => set((state) => ({ ...state, isOpenLogin: flag })),
  isOpenRegister: false,
  setIsOpenRegister: (flag) => set((state) => ({ ...state, isOpenRegister: flag })),
  onClose: () => set((state) => ({ ...state, isOpenRegister: false, isOpenLogin: false })),
}));

export default authModaStore;
