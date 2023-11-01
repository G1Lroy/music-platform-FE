"use client";

import Modal from "./Modal";
import modalStore from "../store/modalStore";
import LoginForm from "./LoginForm";
import userStore from "@/store/userStore";
import { AiFillGithub } from "react-icons/ai";

const AuthModal = () => {
  const { isOpen, onClose } = modalStore();
  const { isLogin } = userStore();

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onChange={() => onClose()}
    >
      <div className="flex items-center w-full justify-center">
        <button className="flex items-center justify-center gap-x-3  w-full border border-neutral-700 py-2 rounded-md bg-neutral-900 hover:bg-neutral-600 transition">
          Sign in with GitHub
          <AiFillGithub className="text-neutral-300" size={25} />
        </button>
      </div>
      <div className="bg-neutral-700 w-full h-px my-5"></div>
      
      <LoginForm />
      {/* <div>If you new go to registration</div> */}
    </Modal>
  );
};

export default AuthModal;
