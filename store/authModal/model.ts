import { AuthFormValuesT } from "@/components/AuthForm";

export interface IauthModal {
  isOpenLogin: boolean;
  setIsOpenLogin: (flag: boolean) => void;
  isOpenRegister: boolean;
  setIsOpenRegister: (flag: boolean) => void;
  onClose: () => void;
  fetchLoginUser: (values: AuthFormValuesT) => Promise<void>;
  fetchRegisterUser: (values: AuthFormValuesT) => Promise<void>;
}
