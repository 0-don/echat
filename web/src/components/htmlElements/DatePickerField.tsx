import React from 'react';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
type DatePickerFieldProps = any & { label: string;  };

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <>
      <label className='my-1 block text-sm font-medium text-gray-900 dark:text-white '>
        Age
      </label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        dropdownMode='scroll'
        showMonthDropdown
        showYearDropdown
        adjustDateOnChange
      />
    </>
  );
};
