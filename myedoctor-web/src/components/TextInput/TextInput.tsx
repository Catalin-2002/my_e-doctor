import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
  name: string;
  label?: string;
  autocomplete?: 'on' | 'off';
  prefixEl?: () => JSX.Element;
  sufixEl?: () => JSX.Element;
  inputClassname?: string;
  labelClassname?: string;
  icon?: ReactNode;
  customError?: ReactNode;
  sufixClassname?: string;
}

const textInput = tv({
  slots: {
    input:
      'focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none',
    peer: `absolute left-[14px] top-[-8px] cursor-text bg-white rounded-full px-1 text-xs transition-all peer-placeholder-shown:top-[16px] 
    peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-[#7E7E7E] peer-focus:top-[-8px] 
    peer-focus:left-[14px] peer-focus:text-[#2690E5] peer-focus:text-xs dark:bg-slate-900 text-[#7E7E7E]`,
  },
  variants: {
    error: {
      true: {
        input: 'border-[#D3483E]  focus:border-[#D3483E] ',
        peer: 'peer-focus:text-[#D3483E] text-[#D3483E]',
      },
    },
  },
});

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      className,
      inputClassname,
      labelClassname,
      icon,
      placeholder,
      customError,
      prefixEl,
      sufixEl,
      sufixClassname = '',
      ...props
    },
    ref
  ) => {
    const { input, peer } = textInput();

    return (
      <div className={twMerge('relative', className)}>
        <div className="absolute top-0 h-12 ltr:right-0 rtl:left-0">{icon}</div>
        <input
          type="text"
          {...props}
          ref={ref}
          placeholder={placeholder}
          autoComplete={props.autocomplete ?? 'off'}
          id={props.name}
          className={twMerge(input({ className: inputClassname }), prefixEl ? 'indent-[100px]' : '', sufixEl ? 'pr-10' : '')}
          aria-label={label}
        />
        {label && (
          <label
            htmlFor={props.name}
            className={twMerge(
              peer({ className: labelClassname }),
              prefixEl ? `peer-placeholder-shown:left-[110px]` : `peer-placeholder-shown:left-[14px]`
            )}
          >
            {label}
          </label>
        )}

        {prefixEl && <div className={twMerge('absolute top-0', sufixClassname)}>{prefixEl()}</div>}
        {sufixEl && <div className={twMerge('absolute right-0 top-0', sufixClassname)}>{sufixEl()}</div>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
