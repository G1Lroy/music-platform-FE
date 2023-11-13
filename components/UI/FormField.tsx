import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { twMerge } from "tailwind-merge";

interface FormFieldProps {
  labelText: string;
  inputType: string;
  fieldName: string;
  disableCondition?: boolean;
  fileFormat?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  labelText,
  inputType,
  fieldName,
  disableCondition,
  fileFormat,
  className,
}) => {
  return (
    <div className={twMerge("flex flex-col", className)}>
      <label className="text-neutral-600 text-sm text-center" htmlFor={fieldName}>
        {labelText}
      </label>
      <Field
        accept={fileFormat}
        disabled={disableCondition}
        className="rounded-md py-1 px-3 text-white bg-neutral-900 font-thin focus:outline-none focus:bg-neutral-600"
        type={inputType}
        id={fieldName}
        name={fieldName}
      />
      <ErrorMessage name={fieldName} component="div" className="text-red-400 text-xs mt-1" />
    </div>
  );
};

export default FormField;
