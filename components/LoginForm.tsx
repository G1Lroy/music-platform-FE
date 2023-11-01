"use client";
import { AuthServise } from "@/apiServise/auth";
import modalStore from "@/store/modalStore";
import userStore from "@/store/userStore";
import { delay } from "@/utils";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Loader from "./UI/Loader";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Enter your Email"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Enter your Password"),
});

const LoginForm: React.FC = () => {
  const { onClose } = modalStore();
  const { setIslogin, setUserData } = userStore();
  const [userRequest, setUserRequest] = useState({
    loading: false,
    error: "",
    response: {},
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    setUserRequest({ ...userRequest, loading: true });
    try {
      await delay(1500);
      const response = await AuthServise.login(values);
      setUserRequest({ ...userRequest, response: response.data });
      console.log(response);
      if (response.status === 201) {
        setIslogin(true);
        setUserData(response.data);
        onClose();
      }
    } catch (error) {
      setUserRequest({ ...userRequest, error: error.message });
      console.log(error.message);
    }
    setUserRequest({ ...userRequest, loading: false });
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="mb-2">
          <label htmlFor="email">Email:</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" className="text-red-500" />
        </div>

        <button type="submit">
          Login
          {userRequest.loading && <Loader className="w-4 h-4 border-2 border-green-600" />}
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
