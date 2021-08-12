import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

interface DatePickerProps {
  label: string;
}

export const DatePickerField: React.FC<DatePickerProps> = ({ label }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <label className='my-1 block text-sm font-medium text-gray-900 dark:text-white '>
        {label}
      </label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date as any)}
        dropdownMode='scroll'
        showMonthDropdown
        showYearDropdown
        adjustDateOnChange
      />
    </>
  );
};
