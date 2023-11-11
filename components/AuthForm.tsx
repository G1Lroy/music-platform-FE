"use client";
import { userServise } from "@/apiServise/user";
import modalStore from "@/store/authModalStore";
import userStore from "@/store/userStore";
import { delay } from "@/utils";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "./UI/Loader";
import toast from "react-hot-toast";
import { saveUserSession } from "@/utils/session";
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Enter your Email"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Enter your Password"),
});

const AuthForm: React.FC = () => {
  const { onClose, isOpenLogin, setIsOpenLogin } = modalStore();
  const { setIslogin, setLoginUserResponse, isUserLoading, setIsUserLoading } = userStore();

  const onSubmit = async (values: { email: string; password: string }) => {
    setIsUserLoading(true);
    await delay(1500);
    isOpenLogin ? fetchLoginUser(values) : fetchRegisterUser(values);
    setIsUserLoading(false);
  };
  const fetchLoginUser = async (values: { email: string; password: string }) => {
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
  const fetchRegisterUser = async (values: { email: string; password: string }) => {
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="text-md ">
        <div className="mb-5 flex flex-col">
          <label className="text-neutral-600 text-sm text-center" htmlFor="email">
            Email address
          </label>
          <Field
            autoFocus={false}
            className="rounded-md py-1 px-3 text-white bg-neutral-900 font-thin focus:outline-none focus:bg-neutral-600"
            type="text"
            id="email"
            name="email"
          />
          <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1" />
        </div>
        <div className="mb-5 flex flex-col">
          <label className="text-neutral-600 text-sm text-center" htmlFor="password">
            Your Password
          </label>
          <Field
            autoFocus={false}
            className="rounded-md py-1 px-3 text-white bg-neutral-900 font-thin focus:outline-none focus:bg-neutral-600"
            type="password"
            id="password"
            name="password"
          />
          <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-1" />
        </div>

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
