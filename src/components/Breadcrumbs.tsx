import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <div className="flex items-center text-gray-500 hover:text-gray-700">
        <Home className="w-4 h-4" />
      </div>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span
            onClick={item.onClick}
            className={
              index === items.length - 1
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700 cursor-pointer'
            }
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}