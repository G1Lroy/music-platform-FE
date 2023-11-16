import { Formik, Form } from "formik";
import uploadModalStore from "@/store/uploadModal";
import React from "react";
import FormField from "./UI/FormField";
import { uploadSchema } from "@/const/validationSchema";
import FileInput from "./UI/FormFieldUpload";
import Loader from "./UI/Loader";
import { uploadFormValuesT } from "@/store/uploadModal/model";

const UploadForm = () => {
  const { isFileLoading, fetchUploadTrack } = uploadModalStore();

  return (
    <Formik
      initialValues={{ title: "", artist: "", audio: null, image: null }}
      validationSchema={uploadSchema}
      onSubmit={(values: uploadFormValuesT) => fetchUploadTrack(values)}
    >
      {({ setFieldValue }) => (
        <Form className="text-md flex flex-col">
          <FormField disableCondition={isFileLoading} fieldName="title" inputType="text" labelText="Song title" />
          <FormField
            className="mb-2"
            disableCondition={isFileLoading}
            fieldName="artist"
            inputType="text"
            labelText="Song artist"
          />
          <FileInput className="mt-3" setFieldValue={setFieldValue} fileType="audio/*" fieldName="audio" />
          <FileInput className="my-3" setFieldValue={setFieldValue} fileType="image/*" fieldName="image" />

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
