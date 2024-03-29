import React from 'react';
import { useMeQuery } from 'src/generated/graphql';
import { Chat } from './chat/Chat';
import { NavBar } from './NavBar';

interface WrapperProps {
  navbar?: boolean;
  fluid?: boolean;
  className?: string;
  scrollbar?: boolean;
  children?: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  navbar = false,
  fluid = false,
  scrollbar,
  className,
}) => {
  const { data: me } = useMeQuery();
  const trueClassName = fluid
    ? `${className} h-full`
    : `${className} container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`;


  return (
    <>
      <div className='flex h-screen'>
        <div className='flex-1 flex flex-col'>
          {navbar && <NavBar />}

          <div className={`${trueClassName} ${scrollbar && 'overflow-hidden'}`}>
            {me?.me && <Chat />}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
