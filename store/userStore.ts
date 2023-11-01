import { create } from "zustand";
type userDataType = {
  email: string;
  id: string;
  access_token: string;
};
interface userStore {
  userData: userDataType;
  isLogin: boolean;
  setIslogin: (flag: boolean) => void;
  setUserData: (obj: userDataType) => void;
}

const userStore = create<userStore>((set) => ({
  userData: {
    email: "",
    id: "",
    access_token: "",
  },
  isLogin: false,
  setIslogin: (flag) => set((state) => ({ ...state, isLogin: flag })),
  setUserData: (obj) => set((state) => ({ ...state, userData: { ...obj } })),
}));

export default userStore;
