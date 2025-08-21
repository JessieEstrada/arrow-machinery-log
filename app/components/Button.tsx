import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customClasses?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ icon, customClasses = "", children, ...props }) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center
        bg-gradient-to-br from-[#EE5453] to-[#d84445]
        text-white font-semibold py-3 px-6 rounded-lg shadow-md
        hover:from-[#d84445] hover:to-[#c43a3b]
        hover:shadow-lg hover:-translate-y-px
        active:translate-y-px active:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EE5453]
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        ${customClasses}
      `}>
      {icon}
      <span>{children}</span>
    </button>
  );
};
