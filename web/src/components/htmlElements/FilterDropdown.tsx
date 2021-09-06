import { Dispatch, Fragment, SetStateAction } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { FilterOptions } from 'src/generated/graphql';
import produce, { Draft } from 'immer';

interface FilterDropdownProps {
  fieldName: string;
  list: DropdownItem[];
  className?: string;
  filterOptions: FilterOptions | null;
  setFilterOptions: Dispatch<SetStateAction<FilterOptions | null>>;
}

type DropdownItem = {
  __typename?: string;
  id: number;
  name: string;
};

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  list,
  fieldName,
  className,
  filterOptions,
  setFilterOptions,
}) => {
  const onChange = (value: DropdownItem) => {
    if (filterOptions) {
      if (filterOptions[fieldName] === Array) {
        filterOptions[fieldName].push(value);
      } else {
        setFilterOptions(
          produce((draft: Draft<FilterOptions>) => {
            draft[fieldName] = value;
  
          })
        );
        // (filterOptions[fieldName] = value);
      }
    }
   
  };

  return (
    <div className={className}>
      <Listbox value={list[3]} onChange={onChange}>
        {({ open }) => (
          <>
            <div className='mt-1 relative'>
              <Listbox.Button className='relative border w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default bg-white dark:bg-dark-light dark:border-dark-light dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple sm:text-sm focus:border-purple '>
                <span className='block truncate text-dark dark:text-white'>
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </span>
                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <SelectorIcon
                    className='h-5 w-5 dark:text-white text-black'
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
                <Listbox.Options className='absolute z-10 mt-1 w-full bg-white dark:bg-dark-light shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                  {list.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active, selected }) => `
                        ${
                          selected && 'bg-purple'
                        } hover:bg-purple cursor-default select-none relative py-2 pl-3 pr-9'
                        `}
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected && 'font-semibold'
                            } dark:text-white block truncate`}
                          >
                            {item.name}
                          </span>

                          {selected && (
                            <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-white'>
                              <CheckIcon
                                className='h-5 w-5 '
                                aria-hidden='true'
                              />
                            </span>
                          )}
                        </>
                      )}
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
