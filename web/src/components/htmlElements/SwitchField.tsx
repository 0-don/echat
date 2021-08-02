import React from 'react';
import { Switch } from '@headlessui/react';

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
      className='ml-1 flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer'
    >
      <span className='sr-only'>Use setting</span>
      <span
        aria-hidden='true'
        className='pointer-events-none absolute w-full h-full rounded-md'
      />
      <span
        aria-hidden='true'
        className={classNames(
          checked ? 'bg-indigo-600' : 'bg-gray-200',
          'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
        )}
      />
      <span
        aria-hidden='true'
        className={classNames(
          checked ? 'translate-x-5 dark:bg-indigo-600' : 'translate-x-0',
          'flex items-center justify-center text-xs pointer-events-none absolute left-0 h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'
        )}
      >
        {icons && icons.length ? (checked ? icons[0] : icons[1]) : null}
      </span>
    </Switch>
  );
};
