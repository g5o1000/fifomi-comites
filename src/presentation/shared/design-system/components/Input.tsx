// Layer: Presentation
// Path: src/presentation/shared/design-system/components/Input.tsx

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border text-fifomi-gris border-gray-300 bg-fifomi-blanco px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fifomi-rojo focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-fifomi-rojo focus:ring-fifomi-rojo',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-fifomi-rojo">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
