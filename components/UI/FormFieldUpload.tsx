import { ErrorMessage } from "formik";
import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface FileInputProps {
  setFieldValue: (fieldName: string, file: File | undefined) => void;
  fileType: string;
  fieldName: string;
  className?: string;
}

const FileInput: React.FC<FileInputProps> = ({ setFieldValue, fileType, fieldName, className }) => {
  const [fileName, setFileName] = useState<string | undefined>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={twMerge("flex items-center justify-center flex-col", className)}>
      <input
        accept={fileType}
        ref={fileInputRef}
        type="file"
        name={fieldName}
        style={{ display: "none" }}
        onChange={(e) => {
          const choosenFile = e.currentTarget.files?.[0];
          setFieldValue(fieldName, choosenFile);
          setFileName(choosenFile?.name);
        }}
      ></input>

      <button
        className="rounded-md bg-neutral-900 w-full py-1 hover:bg-neutral-600 transition"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        {!fileName ? "Upload" : "Choose other"} {fieldName}
      </button>
      <div className="mt-1 flex justify-between items-center w-full">
        <ErrorMessage name={fieldName} component="div" className="text-red-400 text-xs" />
        {fileName && <div className="text-neutral-400 text-xs">Selected file: {fileName}</div>}
      </div>
    </div>
  );
};

export default FileInput;
