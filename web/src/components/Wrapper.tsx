import { NavBar } from './NavBar';

interface WrapperProps {
  navbar?: boolean;
  className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  navbar = false,
  className,
}) => {
  return (
    <>
      {navbar && <NavBar />}
      <div
        className={
          typeof className === 'string'
            ? className
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        }
      >
        {children}
      </div>
    </>
  );
};
