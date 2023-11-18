import React, { ComponentPropsWithoutRef } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

interface ButtonProps extends ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonStyle> {}

const buttonStyle = tv({
  base: 'flex items-center justify-center tracking-[1.25px] rounded-md px-4 py-2 focus:outline-none focus:border-transparent focus:ring text-white font-normal',
  variants: {
    intent: {
      primary: 'bg-green hover:bg-[#498F01] border-transparent',
      secondary: 'bg-blue-600 hover:bg-[#4890E3] border-transparent',
      tertiary: 'bg-gray hover:bg-gray-900 border-transparent',
      text: 'px-0 h-4 self-center text-sm leading-4 text-gray-100 hover:text-gray-400 tracking-normal',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

const Button = ({ className, intent, ...props }: ButtonProps) => (
  <button {...props} className={buttonStyle({ intent, className })}>
    {props.children}
  </button>
);

export default Button;
