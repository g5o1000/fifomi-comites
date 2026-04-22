// Layer: Presentation
// Path: src/presentation/shared/design-system/components/Button.tsx

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            // Variants based on official FIFOMI themes
            'bg-fifomi-rojo text-fifomi-blanco hover:opacity-90': variant === 'primary',
            'bg-fifomi-dorado text-fifomi-blanco hover:opacity-90': variant === 'secondary',
            'border border-fifomi-gris text-fifomi-gris hover:bg-gray-100': variant === 'outline',
            'text-fifomi-gris hover:bg-gray-100': variant === 'ghost',
            
            // Sizes
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 py-2 px-4': size === 'md',
            'h-11 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
