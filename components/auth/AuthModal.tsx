"use client";

import Modal from "../modal/Modal";
import modalStore from "../../store/authModal";
import { AiFillGithub } from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";
import AuthForm from "./AuthForm";
import { githubServise } from "@/apiServise/github";
import Loader from "../UI/Loader";
import ghProfile from "@/store/ghProfile";

const AuthModal = () => {
  const { isOpenLogin, isOpenRegister, onClose, setIsOpenRegister } = modalStore();
  const { ghProfileLoading, setGhProfileLoading } = ghProfile();

  const modalTitle = isOpenLogin ? "Welcome back" : "Create new account";
  const modalDescription = isOpenLogin ? "Login to your account" : "";

  const loginWithGithub = () => {
    setGhProfileLoading(true);
    githubServise.openGithubScreen();
  };

  return (
    <Modal title={modalTitle} description={modalDescription} isOpen={isOpenLogin || isOpenRegister} onChange={onClose}>
      <div className="flex items-center w-full justify-center">
        <div className="w-full">
          <button
            onClick={loginWithGithub}
            className="my-3 flex items-center justify-center gap-x-3  w-full border border-neutral-700 py-2 rounded-md bg-neutral-900 hover:bg-neutral-600 transition"
          >
            Login with GitHub
            <AiFillGithub className="text-neutral-300" size={25} />
            {ghProfileLoading && <Loader className="w-4 h-4 border-2 border-white" />}
          </button>

          <button
            onClick={onClose}
            className="my-3 flex items-center justify-center gap-x-3 border border-neutral-700 w-full  py-2 rounded-md bg-neutral-900 hover:bg-neutral-600 transition"
          >
            {isOpenLogin ? "Continue witout Login" : "Continue witout Registration"}
            <BsSpotify className="text-neutral-300" size={25} />
          </button>
        </div>
      </div>
      <div className="bg-neutral-700 w-full h-px my-3"></div>

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
