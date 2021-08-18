import React from 'react';
import { Switch } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type SwitchProps = {
  checked: boolean;
  onChange: () => void;
  name?: string;
  icons?: [string, string];
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const SwitchField: React.FC<SwitchProps> = ({
  checked,
  onChange,
  icons,
}) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className='mx-1 flex-shrink-0 group relative rounded-full  inline-flex items-center justify-center h-6 w-9 cursor-pointer'
    >
      {checked && (
        <FontAwesomeIcon
          size='xs'
          className='text-purple w-1 h-1 mr-3'
          icon='check'
        />
      )}
      <span
        aria-hidden='true'
        className='pointer-events-none   absolute w-full h-full rounded-md'
      />

      <span
        aria-hidden='true'
        className={classNames(
          checked ? 'border-purple' : 'border-gray-500',
          'border-2 pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
        )}
      />
      <span
        aria-hidden='true'
        className={classNames(
          checked ? 'translate-x-6 bg-purple' : 'translate-x-1 bg-gray-500 ',
          'flex items-center justify-center text-xs pointer-events-none absolute left-0 h-2 w-2 rounded-full  shadow transform ring-0 transition-transform ease-in-out duration-200'
        )}
      >
        {/* {icons && icons.length ? (checked ? icons[0] : icons[1]) : null} */}
      </span>
    </Switch>
  );
};
