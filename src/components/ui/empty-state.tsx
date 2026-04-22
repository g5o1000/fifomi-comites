import React from 'react';
import { cn } from './utils';
import { FileX, Inbox, Search } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: 'inbox' | 'search' | 'file';
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title = 'No hay datos',
  message = 'No se encontraron registros para mostrar',
  icon = 'inbox',
  className,
  action,
}: EmptyStateProps) {
  const IconComponent = {
    inbox: Inbox,
    search: Search,
    file: FileX,
  }[icon];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <IconComponent className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm max-w-md mb-6">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-gradient-to-r from-[#08546C] to-[#022534] text-white rounded-lg hover:from-[#06445a] hover:to-[#011a24] transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
