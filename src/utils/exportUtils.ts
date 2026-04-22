import * as XLSX from 'xlsx';

interface ExportToClipboardOptions {
  data: any[];
  columns: { key: string; label: string }[];
}

interface ExportToCSVOptions {
  data: any[];
  columns: { key: string; label: string }[];
  filename?: string;
}

interface ExportToExcelOptions {
  data: any[];
  columns: { key: string; label: string }[];
  filename?: string;
  sheetName?: string;
}

/**
 * Copia los datos de la tabla al portapapeles
 */
export function exportToClipboard({ data, columns }: ExportToClipboardOptions): void {
  // Crear encabezados
  const headers = columns.map((col) => col.label).join('\t');
  
  // Crear filas
  const rows = data.map((row) => {
    return columns.map((col) => {
      const value = row[col.key];
      return value !== null && value !== undefined ? String(value) : '';
    }).join('\t');
  });
  
  // Combinar encabezados y filas
  const texto = [headers, ...rows].join('\n');
  
  // Copiar al portapapeles
  navigator.clipboard.writeText(texto);
  alert('Datos copiados al portapapeles');
}

/**
 * Exporta los datos a formato CSV
 */
export function exportToCSV({ data, columns, filename = 'export' }: ExportToCSVOptions): void {
  // Crear encabezados
  let csv = columns.map((col) => `"${col.label}"`).join(',') + '\n';
  
  // Crear filas
  data.forEach((row) => {
    const values = columns.map((col) => {
      const value = row[col.key];
      const stringValue = value !== null && value !== undefined ? String(value) : '';
      // Escapar comillas dobles
      return `"${stringValue.replace(/"/g, '""')}"`;
    });
    csv += values.join(',') + '\n';
  });
  
  // Descargar archivo
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}

/**
 * Exporta los datos a formato Excel (XLSX)
 */
export function exportToExcel({ data, columns, filename = 'export', sheetName = 'Datos' }: ExportToExcelOptions): void {
  // Crear datos para Excel con encabezados
  const excelData = data.map((row) => {
    const excelRow: any = {};
    columns.forEach((col) => {
      const value = row[col.key];
      excelRow[col.label] = value !== null && value !== undefined ? value : '';
    });
    return excelRow;
  });
  
  // Crear workbook
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Aplicar estilos a los encabezados (opcional, dependiendo de la versión de xlsx)
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!worksheet[cellAddress]) continue;
    worksheet[cellAddress].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: 'E2EFDA' } },
      alignment: { horizontal: 'center', vertical: 'center' },
    };
  }
  
  // Auto-ajustar ancho de columnas
  const columnWidths = columns.map((col) => {
    const maxLength = Math.max(
      col.label.length,
      ...data.map((row) => {
        const value = row[col.key];
        return value ? String(value).length : 0;
      })
    );
    return { wch: Math.min(maxLength + 2, 50) }; // Máximo 50 caracteres
  });
  worksheet['!cols'] = columnWidths;
  
  // Descargar archivo
  XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
}
