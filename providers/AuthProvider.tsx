"use client";

import userStore from "@/store/userStore";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setIslogin, setLoginUserResponse, setIsUserLoading } = userStore();
  // const [rerender, setRerender] = useState<boolean>(false);
  const getAccessToken = async (code: string) => {
    try {
      const accesData = await axios.get("http://localhost:5000/auth/github/getAccess?code=" + code);

      if (accesData.data) {
        localStorage.setItem("githubAccesToken", accesData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setIslogin(true);
      setLoginUserResponse(JSON.parse(localStorage.getItem("userData")!));
    }
  }, []);
  useEffect(() => {
    const query = window.location.search;
    const URLparams = new URLSearchParams(query);
    const codeParam = URLparams.get("code");
    if (codeParam && localStorage.getItem("GH_access_token") === null) {
      getAccessToken(codeParam);
      setIslogin(true);
    }
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
