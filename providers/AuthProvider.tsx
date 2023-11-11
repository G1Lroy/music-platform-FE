"use client";

import { GithubServise } from "@/apiServise/github";
import userStore from "@/store/userStore";
import { GH_saveTokenLocal, getUserSession } from "@/utils/session";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setIslogin, setLoginUserResponse } = userStore();

  const fetchGithubAccessToken = async (code: string) => {
    try {
      const token = await GithubServise.getAccesToken(code);
      if (token) GH_saveTokenLocal(token);
    } catch (error) {
      //@ts-ignore
      toast(error.message);
      console.log(error);
    }
  };
  const continueUserSession = (
    isUserDataLocal: string | null,
    isGithubTokenLocal: string | null
  ) => {
    if (isUserDataLocal) {
      setIslogin(true);
      setLoginUserResponse(getUserSession());
      toast.success("Login success");
      return;
    }
    if (isGithubTokenLocal) {
      setIslogin(true);
      toast.success("Github login success");
      return;
    }
  };
  const getGithubAccessToken = (isGithubTokenLocal: string | null) => {
    if (!isGithubTokenLocal) {
      const query = window.location.search;
      const URLparams = new URLSearchParams(query);
      const codeParam = URLparams.get("code");
      if (codeParam) {
        fetchGithubAccessToken(codeParam);
        setIslogin(true);
        toast.success("Github login success");
        return;
      }
    }
  };

  useEffect(() => {
    const isUserDataLocal = localStorage.getItem("userData");
    const isGithubTokenLocal = localStorage.getItem("githubAccesToken");
    continueUserSession(isUserDataLocal, isGithubTokenLocal);
    getGithubAccessToken(isGithubTokenLocal);
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
