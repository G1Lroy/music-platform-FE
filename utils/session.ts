import { AxiosResponse } from "axios";

export const saveSession = (resp: AxiosResponse) => sessionStorage.setItem("userData", JSON.stringify(resp.data));

export const getSession = () => JSON.parse(sessionStorage.getItem("userData") || "");

export const removeSession = () => sessionStorage.removeItem("userData");
