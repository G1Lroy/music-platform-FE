"use client";
import React from "react";
import Modal from "../modal/Modal";
import uploadModalStore from "@/store/uploadModal";
import UploadForm from "./UploadForm";

const UploadModal: React.FC = () => {
  const { isOpenUpload, onClose } = uploadModalStore();

  return (
    <Modal title="Add tracks" description="Upload file" isOpen={isOpenUpload} onChange={onClose}>
      <div className="bg-neutral-700 w-full h-px my-3"></div>
      <UploadForm />
    </Modal>
  );
};

export default UploadModal;
