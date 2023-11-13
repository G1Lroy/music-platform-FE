import { Formik, Form, ErrorMessage } from "formik";
import uploadModalStore from "@/store/uploadModalStore";
import React, { useRef, useState } from "react";
import FormField from "./UI/FormField";
import { uploadSchema } from "@/const/validationSchema";
import { delay } from "@/utils";
import FileInput from "./UI/FormFieldUpload";
import Loader from "./UI/Loader";
import { tracksServise } from "@/apiServise/tracks";
import toast from "react-hot-toast";


export type UploadFormValuesT = {
  title: string;
  artist: string;
  audio: File | null;
  image: File | null;
};

const UploadForm = () => {
  const { isFileLoading, setIsFileLoading, onClose } = uploadModalStore();

  const onSubmit = async (values: UploadFormValuesT) => {
    const response = await fetchUploadTrack(values);
    if (response?.status === 201) {
      onClose();
      toast.success("Track uploaded");
    }
  };
  const fetchUploadTrack = async (values: UploadFormValuesT) => {
    setIsFileLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("artist", values.artist);
    formData.append("image", values.image!);
    formData.append("audio", values.audio!);
    try {
      await delay(1500);
      const response = await tracksServise.uploadTrack(formData);
      return response;
    } catch (error) {
      console.log(error);
      //@ts-ignore
      toast.error(response.message);
    } finally {
      setIsFileLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{ title: "", artist: "", audio: null, image: null }}
      validationSchema={uploadSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="text-md flex flex-col">
          <FormField
            disableCondition={isFileLoading}
            fieldName="title"
            inputType="text"
            labelText="Song title"
          />
          <FormField
            className="mb-2"
            disableCondition={isFileLoading}
            fieldName="artist"
            inputType="text"
            labelText="Song artist"
          />
          <FileInput
            className="mt-3"
            setFieldValue={setFieldValue}
            fileType="audio/*"
            fieldName="audio"
          />
          <FileInput
            className="my-3"
            setFieldValue={setFieldValue}
            fileType="image/*"
            fieldName="image"
          />

          <button
            disabled={isFileLoading}
            className="flex items-center justify-center text-black font-bold gap-x-2 w-full bg-green-700 rounded-full py-2 hover:bg-green-600 transition"
            type="submit"
          >
            Upload track
            {isFileLoading && <Loader className="w-4 h-4 border-2 border-white" />}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
