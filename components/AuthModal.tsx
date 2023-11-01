"use client";

import Modal from "./Modal";
import modalStore from "./../store/modalStore";
import LoginForm from "./LoginForm";

const AuthModal = () => {
  const { isOpen, onClose } = modalStore();

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onChange={() => onClose()}
    >
      {/* form here */}
      <LoginForm />
    </Modal>
  );
};

export default AuthModal;
