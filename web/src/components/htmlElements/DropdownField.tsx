import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon, XIcon } from '@heroicons/react/solid';
// import { useDeleteUserLanguageMutation } from 'src/generated/graphql';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type DropdownFieldProps = {
  fieldName: string;
  list: DropdownItem[];
  values: DropdownItem[] | string | number;
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
  list,
  values,
  fieldName,
  setFieldValue,
}) => {
  // const [deleteUserLanguage] = useDeleteUserLanguageMutation();

  const onChange = (value: DropdownItem) => {
    if (values.constructor === Array) {
      setFieldValue(fieldName, [...values, value]);
    } else {
      if (Number.isInteger(parseInt(value.name))) {
        setFieldValue(fieldName, parseInt(value.name));
      } else {
        setFieldValue(fieldName, value.name);
      }
    }
  };

  const deleteSelected = ({ id, name }: DropdownItem) => {
    // deleteUserLanguage({
    //   variables: { name },
    //   update(cache) {
    //     const nId = cache.identify({ id, __typename: 'UserLanguage' });
    //     cache.evict({ id: nId });
    //     cache.gc();
    //   },
    // });
    if (values.constructor === Array) {
      setFieldValue(
        fieldName,
        values.filter((i) => i.name !== name)
      );
    }
  };

  const filteredList =
    values.constructor === Array
      ? list.filter((item) => !values.find(({ name }) => item.name === name))
      : list.filter((item) => item.name !== values);

  return (
    <Listbox value={list[0]} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm font-medium text-gray-900 dark:text-white '>
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </Listbox.Label>
          <div className='mt-1 relative'>
            <Listbox.Button className='relative w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
              <span className='block truncate'>
                <div className='flex flex-wrap'>
                  {values.constructor === Array ? (
                    values.map((item, i) => (
                      <div key={i} className='flex mr-1.5'>
                        {values.length > 1 && (
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
                    <span>{values.toString()}</span>
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
