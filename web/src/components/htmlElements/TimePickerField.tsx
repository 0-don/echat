import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
type TimePickerFieldProps =  any & { label: string };

export const TimePickerField: React.FC<TimePickerFieldProps> = ({...props}) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date as any)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption='Time'
      dateFormat='h:mm aa'
    />
  );
};
