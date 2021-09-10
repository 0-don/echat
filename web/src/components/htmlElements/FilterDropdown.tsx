import { Fragment, useEffect, useRef, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import useServiceFilterStore from 'src/store/ServiceFilterStore';
import _ from 'lodash';

interface FilterDropdownProps {
  fieldName: string;
  list: DropdownItem[];
  className?: string;
  sort?: boolean;
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
  sort = false,
}) => {
  const sortedList = sort
    ? _.orderBy(list, [(item) => item.name.toLowerCase()], ['asc'])
    : list;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<any>();
  const buttonRef = useRef<any>();
  const { filterQuery, setOptions } = useServiceFilterStore();

  const filterOptions = filterQuery.filterOptions;

  const currentValue: DropdownItem[] | [] =
    filterOptions && filterOptions[fieldName] ? filterOptions[fieldName] : [];

  const onChange = (value: DropdownItem) => {
    const exist =
      filterOptions &&
      filterOptions[fieldName]?.find(
        (item: DropdownItem) => item.name === value.name
      );

    if (exist && filterOptions) {
      setOptions({
        ...filterOptions,
        [fieldName]: filterOptions[fieldName].filter(
          (item: DropdownItem) => item.name !== value.name
        ),
      });
    } else {
      setOptions({
        ...filterOptions,
        [fieldName]: [...currentValue, value],
      });
    }
  };
  const handleClickOutside = (event: any) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      return;
    }
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className={className}>
      <Listbox value={list[3]} onChange={onChange}>
        <div className='mt-1 relative'>
          <div ref={buttonRef} onClick={() => setOpen(!open)}>
            <Listbox.Button className='relative border w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default bg-white dark:bg-dark-light dark:border-dark-light dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple sm:text-sm focus:border-purple '>
              <span className='block truncate text-dark dark:text-white'>
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} (
                {currentValue.length})
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 dark:text-white text-black'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 w-full bg-white dark:bg-dark-light shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
              <div ref={wrapperRef}>
                {sortedList.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={`
                        ${
                          currentValue.length > 0 &&
                          currentValue.find(
                            (value: any) => value.name === item.name
                          ) &&
                          'bg-purple'
                        } hover:bg-purple-dark cursor-default select-none relative py-2 pl-3 pr-9'
                        `}
                    value={item}
                  >
                    <span
                      className={`${
                        currentValue.length > 0 &&
                        currentValue.find(
                          (value: any) => value.name === item.name
                        ) &&
                        'font-semibold'
                      } dark:text-white block truncate`}
                    >
                      {item.name}
                    </span>

                    {currentValue.length > 0 &&
                      currentValue.find(
                        (value: any) => value.name === item.name
                      ) && (
                        <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-white'>
                          <CheckIcon className='h-5 w-5 ' aria-hidden='true' />
                        </span>
                      )}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
