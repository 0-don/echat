import { useFormikContext } from 'formik';
import { useEffect } from 'react';

export const FormikAutoSubmit = () => {
  const { submitForm } = useFormikContext();
  useEffect(() => {
    return () => {
      submitForm();
    };
  }, [submitForm]);
  return null;
};
