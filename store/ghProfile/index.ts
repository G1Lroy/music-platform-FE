import { create } from "zustand";
import { ghProfileT, IGhProfile } from "./model";
import { delay } from "@/utils";
import { githubServise } from "@/apiServise/github";
import toast from "react-hot-toast";
import { GH_saveTokenLocal } from "@/utils/session";

const ghProfileEmpty = {
  avatar: "",
  login: "",
  profile_url: "",
};

const ghProfile = create<IGhProfile>((set) => ({
  ghProfile: ghProfileEmpty,
  ghProfileLoading: false,
  setGhProfileLoading: (flag) => set({ ghProfileLoading: flag }),
  fetchGhProfile: async (token) => {
    try {
      set({ ghProfileLoading: true });
      await delay(1000);
      const data = await githubServise.getProfileData(token);
      const profile: ghProfileT = {
        login: data.login,
        avatar: data.avatar_url,
        profile_url: data.html_url,
      };
      set({ ghProfile: profile });
    } catch (error) {
      toast.error("Failed to get github profile");
    } finally {
      set({ ghProfileLoading: false });
    }
  },
  fetchGhToken: async (code) => {
    try {
      const token = await githubServise.getAccesToken(code);
      if (token) GH_saveTokenLocal(token);
    } catch (error) {
      //@ts-ignore
      toast(error.message);
    }
  },
  ghLogout: () => set({ ghProfile: ghProfileEmpty }),
}));

export default ghProfile;
