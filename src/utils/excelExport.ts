import ExcelJS from 'exceljs';

interface ExportData {
  datosCombinados: any[];
  comites: any[];
  incluirSesiones: boolean;
  incluirAcuerdos: boolean;
  incluirDocumentos: boolean;
  formatFecha: (fecha: string) => string;
}

export async function exportarExcelProfesional({
  datosCombinados,
  comites,
  incluirSesiones,
  incluirAcuerdos,
  incluirDocumentos,
  formatFecha
}: ExportData) {
  // Crear un nuevo libro de Excel
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte FIFOMI');

  // Determinar qué columnas mostrar (igual que en la tabla)
  const tiposSeleccionados = [incluirSesiones, incluirAcuerdos, incluirDocumentos].filter(Boolean).length;
  const columnas = [];
  
  // Siempre mostrar Tipo cuando hay múltiples tipos
  if (tiposSeleccionados > 1) {
    columnas.push({ header: 'Tipo', key: 'tipo', width: 12 });
  }
  
  // Columnas de Sesiones
  if (incluirSesiones) {
    columnas.push(
      { header: 'No. Sesión', key: 'numero_sesion', width: 12 },
      { header: 'Tipo de Sesión', key: 'tipo_sesion', width: 18 },
      { header: 'Nombre del Acta', key: 'nombre_acta', width: 45 },
      { header: 'Anexos', key: 'incluye_anexos', width: 10 }
    );
  }
  
  // Columnas de Acuerdos
  if (incluirAcuerdos) {
    columnas.push(
      { header: 'No. Acuerdo', key: 'numero_acuerdo', width: 12 },
      { header: 'Descripción del Acuerdo', key: 'descripcion_acuerdo', width: 45 },
      { header: 'Responsable', key: 'responsable', width: 25 },
      { header: 'Estatus', key: 'estatus', width: 15 },
      { header: 'Prioridad', key: 'prioridad', width: 12 }
    );
  }
  
  // Columnas de Documentos
  if (incluirDocumentos) {
    columnas.push(
      { header: 'Nombre del Archivo', key: 'nombre_archivo', width: 30 },
      { header: 'Tipo de Documento', key: 'tipo_documento', width: 20 },
      { header: 'Descripción del Documento', key: 'descripcion_documento', width: 45 },
      { header: 'Subido Por', key: 'subido_por', width: 25 }
    );
  }
  
  // Columnas comunes
  columnas.push(
    { header: 'Comité', key: 'comite', width: 30 },
    { header: 'Fecha', key: 'fecha', width: 20 },
    { header: 'Ejercicio', key: 'ejercicio', width: 12 }
  );

  worksheet.columns = columnas;

  // Estilizar encabezados (fila 1)
  const headerRow = worksheet.getRow(1);
  headerRow.height = 25;
  headerRow.font = { bold: true, size: 11, name: 'Calibri' };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE5E7EB' } // Gris claro
  };
  headerRow.border = {
    top: { style: 'thin', color: { argb: 'FF9CA3AF' } },
    bottom: { style: 'medium', color: { argb: 'FF6B7280' } },
    left: { style: 'thin', color: { argb: 'FF9CA3AF' } },
    right: { style: 'thin', color: { argb: 'FF9CA3AF' } }
  };
  
  // Agregar datos con estilos
  datosCombinados.forEach((dato: any) => {
    const comite = comites.find((c) => c.id_comite === dato.id_comite);
    const rowData: any = {};
    
    // Tipo (cuando hay múltiples tipos)
    if (tiposSeleccionados > 1) {
      rowData.tipo = dato._tipo === 'sesion' ? 'Sesión' : dato._tipo === 'acuerdo' ? 'Acuerdo' : 'Documento';
    }
    
    // Datos de Sesiones
    if (incluirSesiones) {
      rowData.numero_sesion = dato._tipo === 'sesion' ? dato.numero_sesion : '';
      rowData.tipo_sesion = dato._tipo === 'sesion' ? dato.tipo_sesion : '';
      rowData.nombre_acta = dato._tipo === 'sesion' ? dato.nombre_acta : '';
      rowData.incluye_anexos = dato._tipo === 'sesion' ? dato.incluye_anexos : '';
    }
    
    // Datos de Acuerdos
    if (incluirAcuerdos) {
      rowData.numero_acuerdo = dato._tipo === 'acuerdo' ? dato.numero_acuerdo : '';
      rowData.descripcion_acuerdo = dato._tipo === 'acuerdo' ? dato.descripcion_acuerdo : '';
      rowData.responsable = dato._tipo === 'acuerdo' ? dato.responsable : '';
      rowData.estatus = dato._tipo === 'acuerdo' ? dato.estatus : '';
      rowData.prioridad = dato._tipo === 'acuerdo' ? dato.prioridad : '';
    }
    
    // Datos de Documentos
    if (incluirDocumentos) {
      rowData.nombre_archivo = dato._tipo === 'documento' ? dato.nombre_archivo : '';
      rowData.tipo_documento = dato._tipo === 'documento' ? dato.tipo_documento : '';
      rowData.descripcion_documento = dato._tipo === 'documento' ? dato.descripcion : '';
      rowData.subido_por = dato._tipo === 'documento' ? dato.subido_por : '';
    }
    
    // Datos comunes
    rowData.comite = comite?.nombre_comite || '';
    if (dato._tipo === 'sesion') {
      rowData.fecha = formatFecha(dato.fecha_sesion);
      rowData.ejercicio = dato.ejercicio;
    } else if (dato._tipo === 'acuerdo') {
      rowData.fecha = formatFecha(dato.fecha_sesion);
      rowData.ejercicio = new Date(dato.fecha_sesion).getFullYear();
    } else if (dato._tipo === 'documento') {
      rowData.fecha = formatFecha(dato.fecha_subida);
      rowData.ejercicio = new Date(dato.fecha_subida).getFullYear();
    }
    
    const row = worksheet.addRow(rowData);
    
    // Aplicar estilos a cada celda
    row.height = 20;
    row.alignment = { vertical: 'middle', wrapText: false };
    row.font = { size: 10, name: 'Calibri' };
    
    // Bordes para todas las celdas
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        bottom: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        left: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        right: { style: 'thin', color: { argb: 'FFD1D5DB' } }
      };
    });
    
    // Aplicar colores según el contenido
    let colIndex = 1;
    
    // Columna Tipo
    if (tiposSeleccionados > 1) {
      const tipoCell = row.getCell(colIndex);
      tipoCell.font = { ...tipoCell.font, bold: true };
      if (dato._tipo === 'sesion') {
        tipoCell.font = { ...tipoCell.font, color: { argb: 'FF1D4ED8' } }; // Azul
      } else if (dato._tipo === 'acuerdo') {
        tipoCell.font = { ...tipoCell.font, color: { argb: 'FF15803D' } }; // Verde
      } else {
        tipoCell.font = { ...tipoCell.font, color: { argb: 'FF7C3AED' } }; // Púrpura
      }
      colIndex++;
    }
    
    // Columnas de Sesiones
    if (incluirSesiones) {
      // No. Sesión
      const numSesionCell = row.getCell(colIndex);
      if (dato._tipo === 'sesion') {
        numSesionCell.font = { ...numSesionCell.font, bold: true };
      }
      colIndex++;
      
      // Tipo de Sesión
      const tipoSesionCell = row.getCell(colIndex);
      if (dato._tipo === 'sesion') {
        tipoSesionCell.font = { ...tipoSesionCell.font, bold: true };
        if (dato.tipo_sesion === 'Ordinaria') {
          tipoSesionCell.font = { ...tipoSesionCell.font, color: { argb: 'FF1D4ED8' } }; // Azul
        } else {
          tipoSesionCell.font = { ...tipoSesionCell.font, color: { argb: 'FF7C3AED' } }; // Púrpura
        }
      }
      colIndex++;
      
      // Nombre del Acta
      colIndex++;
      
      // Anexos
      const anexosCell = row.getCell(colIndex);
      if (dato._tipo === 'sesion') {
        anexosCell.font = { ...anexosCell.font, bold: true };
        if (dato.incluye_anexos === 'Sí') {
          anexosCell.font = { ...anexosCell.font, color: { argb: 'FF15803D' } }; // Verde
        } else {
          anexosCell.font = { ...anexosCell.font, color: { argb: 'FF6B7280' } }; // Gris
        }
      }
      colIndex++;
    }
    
    // Columnas de Acuerdos
    if (incluirAcuerdos) {
      // No. Acuerdo
      const numAcuerdoCell = row.getCell(colIndex);
      if (dato._tipo === 'acuerdo') {
        numAcuerdoCell.font = { ...numAcuerdoCell.font, bold: true };
      }
      colIndex++;
      
      // Descripción
      colIndex++;
      
      // Responsable
      colIndex++;
      
      // Estatus
      const estatusCell = row.getCell(colIndex);
      if (dato._tipo === 'acuerdo') {
        estatusCell.font = { ...estatusCell.font, bold: true };
        switch (dato.estatus) {
          case 'Completado':
            estatusCell.font = { ...estatusCell.font, color: { argb: 'FF15803D' } }; // Verde
            break;
          case 'En Proceso':
            estatusCell.font = { ...estatusCell.font, color: { argb: 'FF1D4ED8' } }; // Azul
            break;
          case 'Pendiente':
            estatusCell.font = { ...estatusCell.font, color: { argb: 'FFA16207' } }; // Amarillo/Naranja
            break;
          case 'Cancelado':
            estatusCell.font = { ...estatusCell.font, color: { argb: 'FFDC2626' } }; // Rojo
            break;
        }
      }
      colIndex++;
      
      // Prioridad
      const prioridadCell = row.getCell(colIndex);
      if (dato._tipo === 'acuerdo') {
        prioridadCell.font = { ...prioridadCell.font, bold: true };
        if (dato.prioridad === 'Alta') {
          prioridadCell.font = { ...prioridadCell.font, color: { argb: 'FFDC2626' } }; // Rojo
        } else if (dato.prioridad === 'Media') {
          prioridadCell.font = { ...prioridadCell.font, color: { argb: 'FFA16207' } }; // Amarillo
        } else {
          prioridadCell.font = { ...prioridadCell.font, color: { argb: 'FF6B7280' } }; // Gris
        }
      }
      colIndex++;
    }
    
    // Columnas de Documentos
    if (incluirDocumentos) {
      // Nombre del Archivo
      const nombreArchivoCell = row.getCell(colIndex);
      if (dato._tipo === 'documento') {
        nombreArchivoCell.font = { ...nombreArchivoCell.font, bold: true };
      }
      colIndex++;
      
      // Tipo de Documento
      const tipoDocCell = row.getCell(colIndex);
      if (dato._tipo === 'documento') {
        tipoDocCell.font = { ...tipoDocCell.font, bold: true, color: { argb: 'FF7C3AED' } }; // Púrpura
      }
      colIndex++;
      
      // Descripción
      colIndex++;
      
      // Subido Por
      colIndex++;
    }
  });
  
  // Aplicar fondo alternado a las filas
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber > 1 && rowNumber % 2 === 0) {
      row.eachCell({ includeEmpty: true }, (cell) => {
        if (!cell.fill || (cell.fill as any).fgColor?.argb === undefined) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF9FAFB' } // Gris muy claro para filas pares
          };
        }
      });
    }
  });
  
  // Generar el archivo Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `reporte_FIFOMI_${new Date().toISOString().split('T')[0]}.xlsx`;
  link.click();
}
