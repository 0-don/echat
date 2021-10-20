import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction } from 'react';

export type Tab = {
  name: string;
  icon: string;
  current: boolean;
};

interface TabsProps {
  tabs: Tab[];
  setTabs: Dispatch<SetStateAction<Tab[]>>;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, setTabs }) => {
  return (
    <div className='mt-5'>
      <div className='border-b'>
        <nav
          className='-mb-px flex space-x-8 cursor-pointer '
          aria-label='Tabs'
        >
          {tabs.map(({ name, icon, current }) => (
            <div
              key={name}
              className={`
                  ${
                    current
                      ? 'border-purple text-purple border-b-2'
                      : 'text-black dark:text-white'
                  }
                   group inline-flex items-center py-4 px-1 font-medium text-sm hover:border-b-2 group-hover:border-purple-dark group-hover:text-purple-dark'
                  `}
              aria-current={current ? 'page' : undefined}
              onClick={() =>
                setTabs(
                  tabs.map((tab) =>
                    tab.name === name
                      ? { ...tab, current: !tab.current }
                      : { ...tab, current: false }
                  )
                )
              }
            >
              <FontAwesomeIcon
                size='1x'
                className={`${
                  current ? 'dark:text-purple' : ''
                } dark:text-white group-hover:text-purple-dark -ml-0.5 mr-2 h-5 w-5`}
                icon={icon as any}
              />
              <span className={`group-hover:text-purple-dark`}>{name}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
