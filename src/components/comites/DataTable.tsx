import React, { useState, useMemo } from 'react';
import { Search, Eye, Link as LinkIcon, Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '../../lib/utils';
import { ExportButtons } from '../ui/export-buttons';
import { exportToClipboard, exportToCSV, exportToExcel } from '../../utils/exportUtils';
import { Spinner } from '../ui/spinner';
import { EmptyState } from '../ui/empty-state';

export interface DataTableColumn<T = any> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableAction {
  icon: 'eye' | 'link' | 'edit';
  label: string;
  onClick: (row: any) => void;
  className?: string;
}

interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  data: T[];
  actions?: DataTableAction[];
  searchable?: boolean;
  searchPlaceholder?: string;
  exportable?: boolean;
  className?: string;
  rowsPerPageOptions?: number[];
  isLoading?: boolean;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  actions,
  searchable = true,
  searchPlaceholder = 'Buscar...',
  exportable = true,
  className,
  rowsPerPageOptions = [10, 25, 50, 100],
  isLoading = false,
  emptyStateTitle = 'No hay registros',
  emptyStateMessage = 'No se encontraron datos para mostrar',
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // Filtrar datos basados en búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((row) => {
      return columns.some((col) => {
        const value = row[col.key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, columns]);

  // Paginación
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Resetear a página 1 cuando cambie el filtro
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage]);

  const handleExport = (format: 'copy' | 'csv' | 'excel') => {
    const exportColumns = columns.map(col => ({
      key: col.key,
      label: col.label
    }));

    switch (format) {
      case 'copy':
        exportToClipboard({ data: filteredData, columns: exportColumns });
        break;
      case 'csv':
        exportToCSV({ data: filteredData, columns: exportColumns, filename: 'datos' });
        break;
      case 'excel':
        exportToExcel({ data: filteredData, columns: exportColumns, filename: 'datos', sheetName: 'Datos' });
        break;
      default:
        break;
    }
  };

  const getActionIcon = (iconType: string) => {
    switch (iconType) {
      case 'eye':
        return <Eye className="w-4 h-4" />;
      case 'link':
        return <LinkIcon className="w-4 h-4" />;
      case 'edit':
        return <Pencil className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Controles superiores */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Control de filas por página */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Mostrar</span>
          <Select
            value={String(rowsPerPage)}
            onValueChange={(value) => setRowsPerPage(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {rowsPerPageOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">registros por página</span>
        </div>

        {/* Búsqueda */}
        {searchable && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
      </div>

      {/* Botones de exportación */}
      {exportable && (
        <div className="flex gap-2">
          <ExportButtons
            onCopy={() => handleExport('copy')}
            onExportCSV={() => handleExport('csv')}
            onExportExcel={() => handleExport('excel')}
          />
        </div>
      )}

      {/* Tabla */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#1A2436] to-[#0F1B2A] text-white sticky top-0 z-10 shadow-sm">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-center text-sm",
                      column.className
                    )}
                  >
                    {column.label}
                  </th>
                ))}
                {actions && actions.length > 0 && (
                  <th className="px-4 py-3 text-center text-sm">
                    {actions.length === 1 && actions[0].label === 'Actualizar' ? 'Actualizar' : 'Acciones'}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <Spinner />
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <EmptyState
                      title={emptyStateTitle}
                      message={emptyStateMessage}
                    />
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3 text-sm text-gray-700",
                          column.className
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          {actions.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              variant="ghost"
                              size="sm"
                              onClick={() => action.onClick(row)}
                              className={cn(
                                "h-8 w-8 p-0",
                                action.className
                              )}
                              title={action.label}
                            >
                              {getActionIcon(action.icon)}
                            </Button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <div>
          Mostrando {filteredData.length === 0 ? 0 : startIndex + 1} a {Math.min(endIndex, filteredData.length)} de{' '}
          {filteredData.length} registros
          {searchTerm && ` (filtrados de ${data.length} registros totales)`}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            Primera
          </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>

            {/* Números de página */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={cn(
                      "w-8",
                      currentPage === pageNum &&
                        "bg-gradient-to-r from-[#1A2436] to-[#0F1B2A] text-white"
                    )}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Siguiente
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Última
            </Button>
          </div>
      </div>
    </div>
  );
}