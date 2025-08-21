import React, { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, id, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-[#202327] text-sm font-medium mb-1">
          {label}:
        </label>
      )}
      <textarea
        id={id}
        className={`w-full p-3 border rounded-md focus:ring-2 focus:border-transparent text-[#202327] resize-y bg-white 
                    ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-gray-400"}`}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};
