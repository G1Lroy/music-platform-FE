import { Formik, Form, ErrorMessage } from "formik";
import uploadModalStore from "@/store/uploadModalStore";
import React, { useRef, useState } from "react";
import FormField from "./UI/FormField";
import { uploadSchema } from "@/const/validationSchema";
import { delay } from "@/utils";
import FileInput from "./UI/FormFieldUpload";

export type UploadFormValuesT = {
  title: string;
  artist: string;
  audio: File | null;
  image: File | null;
};

const UploadForm = () => {
  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { isFileLoading, setIsFileLoading } = uploadModalStore();

  const onSubmit = async (values: UploadFormValuesT) => {
    setIsFileLoading(true);
    await delay(1500);
    fetchUploadTrack(values);
    setIsFileLoading(false);
  };
  const fetchUploadTrack = (values: UploadFormValuesT) => {
    console.log(values);
    try {
    } catch (error) {}
  };
  return (
    <Formik
      initialValues={{ title: "", artist: "", audio: null, image: null }}
      validationSchema={uploadSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="text-md flex flex-col gap-y-3">
          <FormField
            disableCondition={isFileLoading}
            fieldName="title"
            inputType="text"
            labelText="Song title"
          />
          <FormField
            disableCondition={isFileLoading}
            fieldName="artist"
            inputType="text"
            labelText="Song artist"
          />
          <FileInput setFieldValue={setFieldValue} fileType="audio/*" fieldName="audio" />
          <FileInput setFieldValue={setFieldValue} fileType="image/*" fieldName="image" />

          {/* <div>
            <input
              accept="audio/*"
              ref={audioInputRef}
              type="file"
              name="audio"
              style={{ display: "none" }}
              onChange={(e) => setFieldValue("audio", e.currentTarget.files?.[0])}
            ></input>
            {<p>Selected file: {audioInputRef?.current?.files?.[0]?.name}</p>}
            <button type="button" onClick={() => audioInputRef.current?.click()}>
              {audioInputRef?.current?.files?.[0]?.name ? "Chose other audio" : "Upload audio"}
            </button>
            <ErrorMessage name="audio" component="div" className="text-red-400 text-xs mt-1" />
          </div>

          <div>
            <input
              accept="image/*"
              ref={imageInputRef}
              type="file"
              name="image"
              style={{ display: "none" }}
              onChange={(e) => setFieldValue("image", e.currentTarget.files?.[0])}
            ></input>
            {<p>Selected file: {imageInputRef?.current?.files?.[0]?.name}</p>}
            <button type="button" onClick={() => imageInputRef.current?.click()}>
              {imageInputRef?.current?.files?.[0]?.name ? "Chose other image" : "Upload image"}
            </button>
            <ErrorMessage name="audio" component="div" className="text-red-400 text-xs mt-1" />
          </div> */}

          <button
            disabled={isFileLoading}
            className="flex items-center justify-center text-black font-bold gap-x-2 w-full bg-green-700 rounded-full py-2 hover:bg-green-600 transition"
            type="submit"
          >
            Upload track
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
