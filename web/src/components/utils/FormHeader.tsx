type FormHeaderProps = {
  text: string;
};

export const FormHeader: React.FC<FormHeaderProps> = ({ text }) => {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <img
        className='mx-auto h-12 w-auto'
        src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
        alt='Workflow'
      />
      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
        {text}
      </h2>
    </div>
  );
};
