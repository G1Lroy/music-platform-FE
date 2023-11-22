import { loginResponseT } from "@/store/user/model";

export const saveUserSession = (data: loginResponseT) => localStorage.setItem("userData", JSON.stringify(data));
export const getUserSession = () => JSON.parse(localStorage.getItem("userData") || "");
export const removeUserSession = () => localStorage.removeItem("userData");
export const GH_saveTokenLocal = (data: string) => localStorage.setItem("githubAccesToken", data);
export const GH_removeTokenLocal = () => localStorage.removeItem("githubAccesToken");
export const GH_getTokenLocal = () => localStorage.getItem("githubAccesToken");
