import { loginResponseT } from "@/store/userStore";
import { AxiosResponse } from "axios";

export const saveUserSession = (data: loginResponseT) =>
  localStorage.setItem("userData", JSON.stringify(data));
export const getUserSession = () => {
  if (localStorage.getItem("userData")) {
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    return userData;
  }
  return;
};
export const removeUserSession = () => localStorage.removeItem("userData");

export const GH_saveTokenLocal = (data: string) => localStorage.setItem("githubAccesToken", data);
export const GH_removeTokenLocal = () => localStorage.removeItem("githubAccesToken");
export const GH_getTokenLocal = () => localStorage.getItem("githubAccesToken");
