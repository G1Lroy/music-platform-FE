import React, { useRef } from "react";

interface FileInputProps {
  setFieldValue: (fieldName: string, file: File | undefined) => void;
  fileType: string;
  fieldName: string;
}

const FileInput: React.FC<FileInputProps> = ({ setFieldValue, fileType, fieldName }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        accept={fileType}
        ref={fileInputRef}
        type="file"
        name={fieldName}
        style={{ display: "none" }}
        onChange={(e) => setFieldValue(fieldName, e.currentTarget.files?.[0])}
      ></input>
      {<p>Selected file: {fileInputRef?.current?.files?.[0]?.name}</p>}

      <button type="button" onClick={() => fileInputRef.current?.click()}>
        {fileInputRef.current ? `Choose other ${fieldName}` : `Upload ${fieldName}`}
      </button>
    </div>
  );
};

export default FileInput;
