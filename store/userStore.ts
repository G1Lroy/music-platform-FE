import { create } from "zustand";
export type loginResponseT = {
  email: string;
  id: string;
  access_token: string;
};
export type profileResponseT = {
  email: string;
  _id: string;
};
export type gitHubProfileT = {
  avatar: string;
  login: string;
  profile_url: string;
};

interface userStore {
  gitHubprofile: gitHubProfileT;
  userErrorResponse: string;
  isUserLoading: boolean;
  loginUserResponse: loginResponseT;
  profileUserResponse: profileResponseT;
  isLogin: boolean;
  setIslogin: (flag: boolean) => void;
  setIsUserLoading: (flag: boolean) => void;
  setLoginUserResponse: (obj: loginResponseT) => void;
  setProfileUserResponse: (obj: profileResponseT) => void;
  setGithubProfile: (profile: gitHubProfileT) => void;
  setUserErrorResponse: (error: string) => void;
}

const userStore = create<userStore>((set) => ({
  gitHubprofile: { avatar: "", login: "", profile_url: "" },
  userErrorResponse: "",
  isUserLoading: false,
  loginUserResponse: {
    email: "",
    id: "",
    access_token: "",
  },
  profileUserResponse: {
    email: "",
    _id: "",
  },
  isLogin: false,
  setGithubProfile: (profile) => set((state) => ({ ...state, gitHubprofile: { ...profile } })),
  setIslogin: (flag) => set((state) => ({ ...state, isLogin: flag })),
  setIsUserLoading: (flag) => set((state) => ({ ...state, isUserLoading: flag })),
  setLoginUserResponse: (obj) => set((state) => ({ ...state, loginUserResponse: { ...obj } })),
  setProfileUserResponse: (obj) => set((state) => ({ ...state, profileUserResponse: { ...obj } })),
  setUserErrorResponse: (error) => set((state) => ({ ...state, userErrorResponse: error })),
}));

export default userStore;
