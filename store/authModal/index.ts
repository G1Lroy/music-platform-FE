import { userServise } from "@/apiServise/user";
import { AuthFormValuesT } from "@/components/AuthForm";
import { saveUserSession } from "@/utils/session";
import { create } from "zustand";
import { delay } from "@/utils";
import toast from "react-hot-toast";
import { IauthModal } from "./model";
import userStore from "../user";

const authModal = create<IauthModal>((set, get) => ({
  isOpenLogin: false,
  setIsOpenLogin: (flag) => set({ isOpenLogin: flag }),
  isOpenRegister: false,
  setIsOpenRegister: (flag) => set({ isOpenRegister: flag }),
  onClose: () => set({ isOpenRegister: false, isOpenLogin: false }),
  fetchLoginUser: async (values) => {
    const { setIsUserLoading, setIsLogin, setLoginUserResponse } = userStore.getState();
    try {
      setIsUserLoading(true);
      await delay(1000);
      const response = await userServise.login(values);
      if (response.status === 201) {
        toast.success("Logged");
        get().onClose();
        setIsLogin(true);
        setLoginUserResponse(response.data);
        saveUserSession(response.data);
      }
    } catch (error) {
      //@ts-ignore
      const message = error.response.data.message;
      toast.error(message);
    } finally {
      setIsUserLoading(false);
    }
  },
  fetchRegisterUser: async (values: AuthFormValuesT) => {
    const { setIsUserLoading } = userStore.getState();
    try {
      setIsUserLoading(true);
      await delay(1000);
      const response = await userServise.register(values);
      if (response.status === 201) {
        toast.success("User created, please login");
        get().onClose();
        await delay(300);
        get().setIsOpenLogin(true);
      }
    } catch (error) {
      //@ts-ignore
      const message = error.response.data.message;
      toast.error(message);
    } finally {
      setIsUserLoading(false);
    }
  },
}));

export default authModal;
