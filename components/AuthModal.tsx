"use client";

import Modal from "./Modal";
import modalStore from "../store/authModalStore";
import userStore from "@/store/userStore";
import { AiFillGithub } from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";
import AuthForm from "./AuthForm";

const AuthModal = () => {
  const { isOpenLogin, isOpenRegister, onClose, setIsOpenRegister } = modalStore();
  const { isLogin } = userStore();

  const modalTitle = isOpenLogin ? "Welcome back" : "Create new account";
  const modalDescription = isOpenLogin ? "Login to your account" : "";
  return (
    <Modal
      title={modalTitle}
      description={modalDescription}
      isOpen={isOpenLogin || isOpenRegister}
      onChange={onClose}
    >
      <div className="flex items-center w-full justify-center">
        {isOpenRegister ? (
          <button className="flex items-center justify-center gap-x-3  w-full border border-neutral-700 py-2 rounded-md bg-neutral-900 hover:bg-neutral-600 transition">
            Sign in with GitHub
            <AiFillGithub className="text-neutral-300" size={25} />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-x-3 border border-neutral-700 w-full  py-2 rounded-md bg-neutral-900 hover:bg-neutral-600 transition"
          >
            Continue witout Login
            <BsSpotify className="text-neutral-300" size={25} />
          </button>
        )}
      </div>
      <div className="bg-neutral-700 w-full h-px my-5"></div>

      <AuthForm />
      {isOpenLogin && (
        <div className="text-sm flex items-center justify-start mt-5 gap-x-1 italic">
          <p className="text-gray-500 ">New user?</p>
          <button
            onClick={() => {
              onClose();
              setIsOpenRegister(true);
            }}
            className="underline text-gray-500 hover:text-green-700"
          >
            registration
          </button>
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
