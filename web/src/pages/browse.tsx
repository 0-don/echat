import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
} from '@heroicons/react/outline';
import withApollo from 'src/utils/apollo/withApollo';
import { Wrapper } from 'src/components/Wrapper';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Browse: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Wrapper navbar className=''>
      <div className='h-screen flex overflow-hidden bg-gray-100'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 md:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700'>
                <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                  <nav className='px-2 space-y-1'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-800 text-white'
                            : 'text-indigo-100 hover:bg-indigo-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className='mr-4 flex-shrink-0 h-6 w-6 text-indigo-300'
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <div className='hidden bg-indigo-700 md:flex md:flex-shrink-0'>
          <div className='flex flex-col w-64'>
            <div className='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto'>
              <div className='mt-5 flex-1 flex flex-col'>
                <nav className='flex-1 px-2 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-indigo-800 text-white'
                          : 'text-indigo-100 hover:bg-indigo-600',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className='mr-3 flex-shrink-0 h-6 w-6 text-indigo-300'
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <MenuAlt2Icon
          onClick={() => setSidebarOpen(true)}
          className='h-6 w-6'
          aria-hidden='true'
        />
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Browse);
