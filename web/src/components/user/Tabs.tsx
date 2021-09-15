import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction } from 'react';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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
    <div>
      <div className='mt-5'>
        <div className='border-b '>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {tabs.map(({ name, icon, current }) => (
              <div
                key={name}
                className={classNames(
                  current ? 'border-purple text-purple border-b-2' : '',
                  'text-white group inline-flex items-center py-4 px-1 font-medium text-sm hover:border-b-2 hover:border-purple-dark hover:text-purple-dark'
                )}
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
                  className={classNames(
                    current
                      ? 'border-purple'
                      : 'text-white group-hover:text-purple-dark',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  icon={icon as any}
                />
                <span>{name}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
