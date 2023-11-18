//TextInput component

import React, { InputHTMLAttributes } from 'react';

// Define the props interface, extending the standard input HTML attributes
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({ className = '', ...props }) => {
  // Default TailwindCSS classes for styling the input
  const defaultClasses =
    'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm';

  // Combine default classes with any custom classes passed via props
  const combinedClasses = `${defaultClasses} ${className}`;

  return <input className={combinedClasses} {...props} />;
};

export default TextInput;
