import React from 'react';
import { Chat } from './chat/Chat';
import { NavBar } from './NavBar';

interface WrapperProps {
  navbar?: boolean;
  fluid?: boolean;
  className?: string;
  scrollbar?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  navbar = false,
  fluid = false,
  scrollbar,
  className,
}) => {
  const trueClassName = fluid
    ? `${className} h-full`
    : `${className} container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`;

  return (
    <>
      <div className='flex h-screen'>
        <div className='flex-1 flex flex-col'>
          {navbar && <NavBar />}

          <div className={`${trueClassName} ${scrollbar && 'overflow-hidden'}`}>
            <Chat />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
