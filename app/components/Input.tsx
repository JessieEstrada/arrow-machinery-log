import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, id, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-[#202327] text-sm font-medium mb-1">
          {label}:
        </label>
      )}
      <input
        id={id}
        className={`w-full p-3 border rounded-md focus:ring-2 focus:border-transparent text-[#202327] bg-white
              ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-gray-400"}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
