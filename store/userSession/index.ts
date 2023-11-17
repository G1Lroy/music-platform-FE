import { create } from "zustand";
import userStore from "../user";
import { getUserSession } from "@/utils/session";
import toast from "react-hot-toast";
import ghProfile from "../ghProfile";

interface IUserSession {
  continueUserSession: (isUserDataLocal: string | null, isGithubTokenLocal: string | null) => void;
  getGithubAccessToken: (isGithubTokenLocal: string | null) => void;
}

const userSession = create<IUserSession>(() => ({
  continueUserSession: (isUserDataLocal, isGithubTokenLocal) => {
    const { setIsLogin, setLoginUserResponse, getCurrentUser } = userStore.getState();

    if (isUserDataLocal) {
      setLoginUserResponse(getUserSession());
      toast.success("Login success");
      setIsLogin(true);
      getCurrentUser();
      return;
    }
    if (isGithubTokenLocal) {
      toast.success("Github login success");
      setIsLogin(true);
      getCurrentUser();
      return;
    }
  },
  getGithubAccessToken: (isGithubTokenLocal) => {
    if (!isGithubTokenLocal) {
      const query = window.location.search;
      const URLparams = new URLSearchParams(query);
      const codeParam = URLparams.get("code");
      if (codeParam) {
        const { fetchGhToken } = ghProfile.getState();
        const { setIsLogin, getCurrentUser } = userStore.getState();
        fetchGhToken(codeParam);
        setIsLogin(true);
        getCurrentUser();
        toast.success("Github login success");
        return;
      }
    }
  },
}));

export default userSession;
