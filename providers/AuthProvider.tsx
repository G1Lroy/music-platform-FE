"use client";

import userStore from "@/store/userStore";
import React, { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setIslogin, setLoginUserResponse } = userStore();
  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      setIslogin(true);
      setLoginUserResponse(JSON.parse(sessionStorage.getItem("userData")!));
    }
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
