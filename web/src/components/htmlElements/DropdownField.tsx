import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon, XIcon } from '@heroicons/react/solid';
import { FormikProps } from 'formik';
// @ts-ignore
import { UpdatedUser, UpsertUserService } from 'src/generated/graphql';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type DropdownFieldProps = {
  fieldName: string;
  list: DropdownItem[];
  className?: string;
} & FormikProps<UpdatedUser | UpsertUserService>;

type DropdownItem = {
  __typename?: string;
  id: number;
  name: string;
};

export const DropdownField: React.FC<DropdownFieldProps> = ({
  list,
  values,
  fieldName,
  className,
  setFieldValue,
}) => {
  const currentValue = list.find(
    ({ id, name }) => id === values[fieldName] || name === values[fieldName]
  );

  const onChange = (value: DropdownItem) => {
    // check if array and return current + value
    if (values[fieldName].constructor === Array) {
      setFieldValue(fieldName, [...values[fieldName], value]);
    } else {
      // check if number or string
      values[fieldName] > 0
        ? setFieldValue(fieldName, value.id)
        : setFieldValue(fieldName, value.name);
    }
  };

  const deleteSelected = ({ name }: DropdownItem) => {
    setFieldValue(
      fieldName,
      values[fieldName].filter((i: DropdownItem) => i.name !== name)
    );
  };

  const filteredList =
    values[fieldName].constructor === Array
      ? list.filter(
          (item) =>
            !values[fieldName].find(
              ({ name }: { name: string }) => item.name === name
            )
        )
      : list;

  return (
    <div className={className}>
      <Listbox value={list[0]} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Label className='my-1 block text-sm font-medium text-gray-900 dark:text-white '>
              {(fieldName.charAt(0).toUpperCase() + fieldName.slice(1)).replace(
                'Id',
                ''
              )}
            </Listbox.Label>
            <div className='relative'>
              <Listbox.Button className='relative border w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default  dark:bg-dark-light dark:border-dark-light  dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple sm:text-sm focus:border-purple '>
                <span className='block truncate'>
                  <div className='flex flex-wrap text-gray-700 dark:text-white'>
                    {values[fieldName].constructor === Array ? (
                      values[fieldName].map((item: DropdownItem) => (
                        <div key={item.name} className='flex mr-1.5'>
                          {values[fieldName].length > 1 && (
                            <XIcon
                              className='h-5 w-5 text-gray-400 hover:text-white'
                              aria-hidden='true'
                              onClick={() => deleteSelected(item)}
                            />
                          )}
                          <span>{item.name}</span>
                        </div>
                      ))
                    ) : (
                      <div>{currentValue && currentValue.name}</div>
                    )}
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
                  className='absolute z-10 mt-1 w-full bg-white dark:bg-dark-light shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto sm:text-sm'
                >
                  {filteredList?.map((item) => (
                    <Listbox.Option
                      key={item.name}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'text-white  bg-purple'
                            : 'text-black dark:text-gray-50',
                          'cursor-default select-none relative py-2 pl-8 pr-4'
                        )
                      }
                      value={item}
                    >
                      <span
                        className={classNames(
                          values ? 'font-semibold' : 'font-normal',
                          'block truncate text-center'
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
    </div>
  );
};
