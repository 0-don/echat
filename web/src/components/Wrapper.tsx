import { NavBar } from './NavBar';

interface WrapperProps {
  navbar?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  navbar = false,
}) => {
  return (
    <>
      {navbar && <NavBar />}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {children}
      </div>
    </>
  );
};
