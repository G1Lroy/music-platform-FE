import { userServise } from "@/apiServise/user";
import { delay } from "@/utils";
import { removeUserSession } from "@/utils/session";
import toast from "react-hot-toast";
import { IUserProfile } from "./model";

import { create } from "zustand";

const loginResponseEmpty = {
  email: "",
  id: "",
  access_token: "",
};
const userProfileEmpty = { email: "", _id: "" };

const userStore = create<IUserProfile>((set, get) => ({
  isLogin: false,
  userProfileLoading: false,
  isUserLoading: false,
  deleteUserProfileMessage: "",
  loginResponse: loginResponseEmpty,
  userProfile: userProfileEmpty,
  setIsLogin: (flag) => set({ isLogin: flag }),
  setIsUserLoading: (flag) => set({ isUserLoading: flag }),
  setLoginUserResponse: (respornse) => set({ loginResponse: respornse }),
  fetchProfileInfo: async (token: string, id: string) => {
    try {
      set({ userProfileLoading: true });
      await delay(1000);
      const response = await userServise.getProfileInfo(token, id);
      set({ userProfile: response.data });
    } catch (error) {
      //@ts-ignore
      toast.error(error.response.data.error);
    } finally {
      set({ userProfileLoading: false });
    }
  },
  fetchDeleteUser: async (token: string, id: string) => {
    try {
      set({ userProfileLoading: true });
      await delay(1000);
      const response = await userServise.deleteUser(token, id);
      if (response.status === 200) {
        removeUserSession();
        set({ isLogin: false });
        set({ deleteUserProfileMessage: response.data });
        get().logout();
      }
    } catch (error) {
      //@ts-ignore
      toast.error(error.response.data.error);
    } finally {
      set({ userProfileLoading: false });
    }
  },
  logout: async () => {
    set({ isLogin: false });
    set({ userProfile: userProfileEmpty });
    set({ loginResponse: loginResponseEmpty });
  },
}));

export default userStore;
