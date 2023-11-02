import { create } from "zustand";
export type userDataType = {
  email: string;
  id: string;
  access_token: string;
};
interface userStore {
  userErrorResponse: string;
  isUserLoading: boolean;
  userData: userDataType;
  isLogin: boolean;
  setIslogin: (flag: boolean) => void;
  setIsUserLoading: (flag: boolean) => void;
  setUserData: (obj: userDataType) => void;
  setUserErrorResponse: (error: string) => void;
}

const userStore = create<userStore>((set) => ({
  userErrorResponse: "",
  isUserLoading: false,
  userData: {
    email: "",
    id: "",
    access_token: "",
  },
  isLogin: true,
  setIslogin: (flag) => set((state) => ({ ...state, isLogin: flag })),
  setIsUserLoading: (flag) => set((state) => ({ ...state, isUserLoading: flag })),
  setUserData: (obj) => set((state) => ({ ...state, userData: { ...obj } })),
  setUserErrorResponse: (error) => set((state) => ({ ...state, userErrorResponse: error })),
}));

export default userStore;
