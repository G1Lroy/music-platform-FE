import { create } from "zustand";
export type loginResponseT = {
  email: string;
  id: string;
  access_token?: string;
};

interface userStore {
  userErrorResponse: string;
  isUserLoading: boolean;
  loginUserResponse: loginResponseT;
  profileUserResponse: loginResponseT;
  isLogin: boolean;
  setIslogin: (flag: boolean) => void;
  setIsUserLoading: (flag: boolean) => void;
  setLoginUserResponse: (obj: loginResponseT) => void;
  setProfileUserResponse: (obj: loginResponseT) => void;
  setUserErrorResponse: (error: string) => void;
}

const userStore = create<userStore>((set) => ({
  userErrorResponse: "",
  isUserLoading: false,
  loginUserResponse: {
    email: "",
    id: "",
    access_token: "",
  },
  profileUserResponse: {
    email: "",
    id: "",
    access_token: "",
  },
  isLogin: false,
  setIslogin: (flag) => set((state) => ({ ...state, isLogin: flag })),
  setIsUserLoading: (flag) => set((state) => ({ ...state, isUserLoading: flag })),
  setLoginUserResponse: (obj) => set((state) => ({ ...state, loginUserResponse: { ...obj } })),
  setProfileUserResponse: (obj) => set((state) => ({ ...state, profileUserResponse: { ...obj } })),
  setUserErrorResponse: (error) => set((state) => ({ ...state, userErrorResponse: error })),
}));

export default userStore;
