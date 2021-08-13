import React, { useState } from 'react';
import { CalendarContainer } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface DatePickerProps {}

export const DatePickerField: React.FC<DatePickerProps> = ({}) => {
  const [startDate, setStartDate] = useState(new Date());
  const MyContainer = ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode[];
  }) => {
    return (
      <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
        <CalendarContainer className={className}>
          <div style={{ background: '#f0f0f0' }}>
            What is your favorite day?
          </div>
          <div style={{ position: 'relative' }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date as any)}
      calendarContainer={MyContainer}
    />
  );
};
