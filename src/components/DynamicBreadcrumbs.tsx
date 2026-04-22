import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../lib/utils';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface DynamicBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function DynamicBreadcrumbs({ items, className }: DynamicBreadcrumbsProps) {
  return (
    <nav 
      className={cn(
        "sticky top-[112px] z-50 flex items-center gap-2 text-sm mb-6 px-4 py-3 bg-white rounded-lg border border-gray-200 border-b-[3px] border-b-[#08546C] shadow-lg transition-all duration-200",
        className
      )}
      aria-label="Breadcrumb"
    >
      <Home className="w-4 h-4 text-[#0F1B2A]" />
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-[#0F1B2A] flex-shrink-0" />
          )}
          {item.onClick && !item.isActive ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                item.onClick?.();
              }}
              className="text-[#0F1B2A] hover:underline hover:text-[#1A2436] transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span 
              className={cn(
                "transition-colors",
                item.isActive ? "text-[#0F1B2A] font-medium" : "text-[#0F1B2A]"
              )}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}