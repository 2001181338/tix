import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  useEffect(() => {
    setFieldValue(field.name, props.valueDate)
  }, [props.valueDate])
  return (
    <DatePicker
      {...field}
      {...props}
      dateFormat={"dd-MM-yyyy"}
      className={"form-control w-100"}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
  );
};