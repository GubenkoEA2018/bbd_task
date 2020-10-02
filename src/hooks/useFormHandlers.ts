import { ChangeEvent } from 'react';
import { useFormik } from 'formik';

type UseFormHandlers = {
  handleInputChange(field: string, value: string | number | boolean): void;
  handleInputFocus(field: string): void;
  handleInputTouched(field: string, isTouched?: boolean): void;
  handleFormControlChange(
    field: string,
  ): (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useFormHandlers = (
  setFieldValue: ReturnType<typeof useFormik>['setFieldValue'],
  setFieldTouched: ReturnType<typeof useFormik>['setFieldTouched'],
): UseFormHandlers => {
  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ): void => {
    setFieldValue(field, value);
  };

  const handleInputFocus = (field: string): void => {
    setFieldTouched(field, false);
  };

  const handleInputTouched = (field: string, isTouched = true): void => {
    setFieldTouched(field, isTouched);
  };

  const handleFormControlChange = (field: string) => (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    handleInputChange(field, e.target.value);
  };

  return {
    handleInputChange,
    handleInputFocus,
    handleInputTouched,
    handleFormControlChange,
  };
};
