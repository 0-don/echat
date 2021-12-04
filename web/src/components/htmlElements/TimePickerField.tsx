import { useFormikContext } from 'formik';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { UpdatedUser } from 'src/generated/graphql';

type TimePickerFieldProps = {
  label: 'to' | 'from' | string;
  minTime?: Date;
  maxTime?: Date;
  dayName?: string;
  readOnly?: boolean;
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
  readOnly,
}) => {
  const { values, setFieldValue } = useFormikContext<UpdatedUser>();

  const getTime = values.schedules.find(({ name }) => name === dayName);

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button
      type='button'
      className={`${
        readOnly
          ? 'dark:bg-dark dark:border-dark-light'
          : 'dark:bg-dark-light dark:border-dark-light'
      } dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple focus:border-purple sm:text-sm border w-full rounded-md shadow-sm pl-3 py-2 text-left`}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
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
          readOnly={readOnly}
          customInput={<ExampleCustomInput />}
          className='bg-dark'
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
