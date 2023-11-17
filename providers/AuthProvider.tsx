"use client";

import userStore from "@/store/user";
import userSession from "@/store/userSession";
import React, { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { continueUserSession, getGithubAccessToken } = userSession();


  useEffect(() => {
    const isUserDataLocal = localStorage.getItem("userData") || null;
    const isGithubTokenLocal = localStorage.getItem("githubAccesToken") || null;
    continueUserSession(isUserDataLocal, isGithubTokenLocal);
    getGithubAccessToken(isGithubTokenLocal);
  }, []);


  return <>{children}</>;
};

export default AuthProvider;
