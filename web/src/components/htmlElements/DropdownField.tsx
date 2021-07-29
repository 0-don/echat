import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon, XIcon } from '@heroicons/react/solid';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type DropdownFieldProps = {
  multiple?: boolean;
  name: string;
  list: DropdownItem[];
  values: DropdownItem[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

type DropdownItem = {
  __typename?: string;
  id: number;
  name: string;
};

export const DropdownField: React.FC<DropdownFieldProps> = ({
  multiple = false,
  list,
  values,
  name,
  setFieldValue,
}) => {
  const onChange = (value: DropdownItem) => {
    console.log(value);
    if (!multiple) {
      setFieldValue(name, [value]);
    } else {
      setFieldValue(name, [...values, value]);
    }
  };

  const deleteSelected = (id: number) => {
    setFieldValue(
      name,
      values.filter((item) => item.id !== id)
    );
  };

  const filteredList = list.filter(
    (item) => !values.find(({ name }) => item.name === name)
  );

  return (
    <Listbox value={values[0]} onChange={(value) => onChange(value)}>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm font-medium text-gray-900 dark:text-white '>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Listbox.Label>
          <div className='mt-1 relative'>
            <Listbox.Button className='relative w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
              {/* <span className='block truncate'>{selected[0].name}</span> */}
              <span className='block truncate'>
                <div className='flex flex-wrap'>
                  {values.length
                    ? values.map((item) => (
                        <div key={item.id} className='flex mr-1.5'>
                          {multiple && (
                            <XIcon
                              className='h-5 w-5 text-gray-400 hover:text-white'
                              aria-hidden='true'
                              onClick={() => deleteSelected(item.id)}
                            />
                          )}
                          <span key={item.name}>{item.name}</span>
                        </div>
                      ))
                    : ' '}
                </div>
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options
                static
                className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
              >
                {filteredList?.map((item) => (
                  <Listbox.Option
                    key={item.name}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-8 pr-4'
                      )
                    }
                    value={item}
                  >
                    <span
                      className={classNames(
                        values ? 'font-semibold' : 'font-normal',
                        'block truncate'
                      )}
                    >
                      {item.name}
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
