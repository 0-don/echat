import React, { ButtonHTMLAttributes } from "react";
import { Loading } from "../utils/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  text: string;
  icon?: IconProp;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  icon,
  text,
  className = "",
  ...props
}) => {
  return loading ? (
    <Loading />
  ) : (
    <button
      {...props}
      className={`${className} flex justify-center items-center py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-purple hover:bg-purple-dark `}
    >
      {icon && <FontAwesomeIcon className="mr-1" icon={icon} />}
      {text}
    </button>
  );
};
