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
      <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-80'>
        {children}
      </div>
    </>
  );
};
