import { NavBar } from './NavBar';

interface WrapperProps {
  navbar?: boolean;
  fluid?: boolean;
  className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  navbar = false,
  fluid = false,
  className,
}) => {
  const trueClassName = fluid
    ? `${className} h-full`
    : `${className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-full`;

  return (
    <>
      <div className='flex h-screen'>
        <div className='flex-1 flex flex-col overflow-hidden'>
          {navbar && <NavBar />}

          <div className={trueClassName}>{children}</div>
        </div>
      </div>
    </>
  );
};
