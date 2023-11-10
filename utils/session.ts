import { AxiosResponse } from "axios";

export const saveSession = (resp: AxiosResponse) => localStorage.setItem("userData", JSON.stringify(resp.data));

export const getSession = () => JSON.parse(localStorage.getItem("userData") || "");

export const removeSession = () => localStorage.removeItem("userData");
