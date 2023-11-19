"use client";
import { Formik, Form } from "formik";
import { authSchema } from "@/const/validationSchema";
import modalStore from "@/store/authModal";
import userStore from "@/store/user";
import Loader from "../UI/Loader";
import toast from "react-hot-toast";
import FormField from "../UI/FormField";

export type AuthFormValuesT = {
  email: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const { isOpenLogin, fetchLoginUser, fetchRegisterUser } = modalStore();
  const { isUserLoading } = userStore();

  const onSubmit = async (values: AuthFormValuesT) => {
    isOpenLogin ? fetchLoginUser(values) : fetchRegisterUser(values);
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} validationSchema={authSchema} onSubmit={onSubmit}>
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
