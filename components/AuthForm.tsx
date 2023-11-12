"use client";
import { Formik, Form } from "formik";
import { delay } from "@/utils";
import { saveUserSession } from "@/utils/session";
import { authSchema } from "@/const/validationSchema";
import { userServise } from "@/apiServise/user";
import modalStore from "@/store/authModalStore";
import userStore from "@/store/userStore";
import Loader from "./UI/Loader";
import toast from "react-hot-toast";
import FormField from "./UI/FormField";

export type AuthFormValuesT = {
  email: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const { onClose, isOpenLogin, setIsOpenLogin } = modalStore();
  const { setIslogin, setLoginUserResponse, isUserLoading, setIsUserLoading } = userStore();

  const onSubmit = async (values: AuthFormValuesT) => {
    setIsUserLoading(true);
    await delay(1500);
    isOpenLogin ? fetchLoginUser(values) : fetchRegisterUser(values);
    setIsUserLoading(false);
  };
  const fetchLoginUser = async (values: AuthFormValuesT) => {
    try {
      const response = await userServise.login(values);
      if (response.status === 201) {
        toast.success("Logged");
        onClose();
        setIslogin(true);
        setLoginUserResponse(response.data);
        saveUserSession(response.data);
      }
    } catch (error) {
      //@ts-ignore
      const message = error.response.data.message;
      toast.error(message);
    }
  };
  const fetchRegisterUser = async (values: AuthFormValuesT) => {
    try {
      const response = await userServise.register(values);
      if (response.status === 201) {
        toast.success("User created, please login");
        onClose();
        await delay(300);
        setIsOpenLogin(true);
      }
    } catch (error) {
      //@ts-ignore
      const message = error.response.data.message;
      toast.error(message);
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={authSchema}
      onSubmit={onSubmit}
    >
      <Form className="text-md flex flex-col gap-y-5">
        <FormField fieldName="email" inputType="text" labelText="Email address" />
        <FormField fieldName="password" inputType="password" labelText="Your Password" />
        <button
          className="flex items-center justify-center gap-x-2 w-full bg-neutral-600 rounded-md py-2 border border-green-500 hover:bg-green-600 transition"
          type="submit"
        >
          {isOpenLogin ? "Login" : "Register"}
          {isUserLoading && <Loader className="w-4 h-4 border-2 border-white" />}
        </button>
      </Form>
    </Formik>
  );
};

export default AuthForm;
