import { useFormikContext } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import { UpdatedUser } from 'src/generated/graphql';

type TimePickerFieldProps = {
  label: 'to' | 'from' | string;
  minTime?: Date;
  maxTime?: Date;
  dayName?: string;
};

export type Schedule = {
  __typename?: string;
  id: number;
  name: string;
  from: number;
  to: number;
  available: boolean;
};

export const TimePickerField: React.FC<TimePickerFieldProps> = ({
  label,
  minTime,
  maxTime,
  dayName,
}) => {
  const { values, setFieldValue } = useFormikContext<UpdatedUser>();

  const getTime = values.schedules.find(({ name }) => name === dayName);

  return (
    <>
      <label
        htmlFor={label}
        className='block my-1 text-sm font-medium text-gray-700 dark:text-gray-50'
      >
        {/* {label} */}
      </label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <DatePicker
          selected={getTime ? getTime[label] : new Date()}
          onChange={(date) =>
            setFieldValue(
              'schedules',
              values.schedules.map((i) =>
                i.name === dayName ? { ...i, [label]: date } : i
              )
            )
          }
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption='Time'
          dateFormat='h:mm aa'
          minTime={
            minTime
              ? new Date(0, 0, 0, minTime.getHours(), minTime.getMinutes())
              : new Date(0, 0, 0, 0, 0)
          } // 7:30am
          maxTime={
            maxTime
              ? new Date(0, 0, 0, maxTime.getHours(), maxTime.getMinutes())
              : new Date(0, 0, 0, 23, 59)
          } // 4:30pm
        />
      </div>
    </>
  );
};
