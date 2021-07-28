import useDarkModeStore from '../../store/DarkModeStore';
import { Switch } from '@headlessui/react';
import { useEffect } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const DarkModeSwitch: React.FC = () => {
  const { theme, hasHydrated, changeTheme, startTheme } = useDarkModeStore();

  useEffect(() => {
    startTheme();
  }, []);

  return (
    <Switch
      checked={hasHydrated && theme}
      onChange={changeTheme}
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
          hasHydrated && theme ? 'bg-indigo-600' : 'bg-gray-200',
          'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
        )}
      />
      <span
        aria-hidden='true'
        className={classNames(
          hasHydrated && theme ? 'translate-x-5 dark:bg-indigo-600' : 'translate-x-0',
          'flex items-center justify-center text-xs pointer-events-none absolute left-0 h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200'
        )}
      >
        {hasHydrated && theme ? '🌙' : '☀️'}
      </span>
    </Switch>
  );
};
