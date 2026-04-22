import React, { useState, useMemo, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { comites, acuerdos, documentos } from '../data/mockData';
import { exportarExcelProfesional } from '../utils/excelExport';
import { ExportButtons } from './ui/export-buttons';
import { exportToClipboard, exportToCSV } from '../utils/exportUtils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  FileCheck,
  FileText,
  Filter,
  Download,
  Calendar as CalendarIcon,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileSpreadsheet,
  CheckSquare,
  FileBarChart,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { CustomCalendar } from './ui/custom-calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReportesViewProps {
  filtroInicial?: 'comites' | 'acuerdos' | 'documentos' | 'sesiones' | 'cumplimiento';
  onBack: () => void;
  // Nuevos parámetros para pre-filtrado
  comiteIdInicial?: number;
  tipoInicialSesiones?: boolean;
  tipoInicialAcuerdos?: boolean;
  tipoInicialDocumentos?: boolean;
  bloquearComite?: boolean;
  bloquearTipos?: boolean;
}

export function ReportesView({ filtroInicial = 'sesiones', onBack, comiteIdInicial, tipoInicialSesiones, tipoInicialAcuerdos, tipoInicialDocumentos, bloquearComite, bloquearTipos }: ReportesViewProps) {
  // Tipos de datos a incluir en el reporte
  const [incluirSesiones, setIncluirSesiones] = useState(tipoInicialSesiones ?? true);
  const [incluirAcuerdos, setIncluirAcuerdos] = useState(tipoInicialAcuerdos ?? true);
  const [incluirDocumentos, setIncluirDocumentos] = useState(tipoInicialDocumentos ?? false);
  
  // Filtros
  const [filtroComite, setFiltroComite] = useState<string>(comiteIdInicial ? comiteIdInicial.toString() : 'todos');
  const [filtroEjercicio, setFiltroEjercicio] = useState<string>('todos');
  const [filtroTipoSesion, setFiltroTipoSesion] = useState<string>('todos');
  const [filtroIncluyeAnexos, setFiltroIncluyeAnexos] = useState<string>('todos');
  const [filtroEstatus, setFiltroEstatus] = useState<string>('todos');
  const [filtroBusqueda, setFiltroBusqueda] = useState<string>('');
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>();
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>();
  
  // Estados para controlar popovers
  const [popoverFechaDesdeOpen, setPopoverFechaDesdeOpen] = useState(false);
  const [popoverFechaHastaOpen, setPopoverFechaHastaOpen] = useState(false);
  
  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina, setItemsPorPagina] = useState(10);

  // Generar años desde 2014 hasta el año actual
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 + 1 }, (_, i) => currentYear - i);

  // Sincronizar Ejercicio con Rango de Fechas
  useEffect(() => {
    if (filtroEjercicio !== 'todos') {
      // Si se selecciona un ejercicio específico, auto-llenar fechas
      const año = parseInt(filtroEjercicio);
      setFechaDesde(new Date(año, 0, 1)); // 1 de enero
      setFechaHasta(new Date(año, 11, 31)); // 31 de diciembre
    } else {
      // Si se selecciona "Todos los ejercicios", limpiar fechas
      setFechaDesde(undefined);
      setFechaHasta(undefined);
    }
  }, [filtroEjercicio]);

  // Determinar si los campos de fecha están deshabilitados
  const fechasDeshabilitadas = filtroEjercicio !== 'todos';

  const datosCombinados = useMemo(() => {
    let datos: any[] = [];

    // Combinar datos según lo seleccionado
    // TODO: Agregar datos de sesiones cuando estén disponibles en mockData
    // if (incluirSesiones) {
    //   datos = [
    //     ...datos,
    //     ...sesiones.map((s) => ({ ...s, _tipo: 'sesion' })),
    //   ];
    // }
    if (incluirAcuerdos) {
      datos = [
        ...datos,
        ...acuerdos.map((a) => ({ ...a, _tipo: 'acuerdo' })),
      ];
    }
    if (incluirDocumentos) {
      datos = [
        ...datos,
        ...documentos.map((d) => ({ ...d, _tipo: 'documento' })),
      ];
    }

    // Aplicar filtros
    if (filtroComite !== 'todos') {
      datos = datos.filter((d: any) => d.id_comite === parseInt(filtroComite));
    }

    if (filtroEjercicio !== 'todos') {
      datos = datos.filter((d: any) => {
        if (d._tipo === 'sesion') {
          return d.ejercicio === parseInt(filtroEjercicio);
        } else if (d._tipo === 'acuerdo') {
          const year = new Date(d.fecha_sesion).getFullYear();
          return year === parseInt(filtroEjercicio);
        } else if (d._tipo === 'documento') {
          const year = new Date(d.fecha_subida).getFullYear();
          return year === parseInt(filtroEjercicio);
        }
        return true;
      });
    }

    if (filtroTipoSesion !== 'todos') {
      datos = datos.filter((d: any) => {
        if (d._tipo === 'sesion') {
          return d.tipo_sesion === filtroTipoSesion;
        }
        return true;
      });
    }

    if (filtroIncluyeAnexos !== 'todos') {
      datos = datos.filter((d: any) => {
        if (d._tipo === 'sesion') {
          return d.incluye_anexos === filtroIncluyeAnexos;
        }
        return true;
      });
    }

    if (filtroEstatus !== 'todos') {
      datos = datos.filter((d: any) => {
        if (d._tipo === 'acuerdo') {
          return d.estatus === filtroEstatus;
        }
        return true;
      });
    }

    if (fechaDesde) {
      datos = datos.filter((d: any) => {
        let fecha: Date | null = null;
        if (d._tipo === 'sesion') {
          fecha = new Date(d.fecha_sesion);
        } else if (d._tipo === 'acuerdo') {
          fecha = new Date(d.fecha_sesion);
        } else if (d._tipo === 'documento') {
          fecha = new Date(d.fecha_subida);
        }
        return fecha && fecha >= fechaDesde;
      });
    }

    if (fechaHasta) {
      datos = datos.filter((d: any) => {
        let fecha: Date | null = null;
        if (d._tipo === 'sesion') {
          fecha = new Date(d.fecha_sesion);
        } else if (d._tipo === 'acuerdo') {
          fecha = new Date(d.fecha_sesion);
        } else if (d._tipo === 'documento') {
          fecha = new Date(d.fecha_subida);
        }
        return fecha && fecha <= fechaHasta;
      });
    }

    if (filtroBusqueda.trim() !== '') {
      const busqueda = filtroBusqueda.toLowerCase();
      datos = datos.filter((d: any) => {
        if (d._tipo === 'sesion') {
          return (
            d.nombre_acta?.toLowerCase().includes(busqueda) ||
            d.nombre_carpeta?.toLowerCase().includes(busqueda) ||
            d.numero_sesion_texto?.toLowerCase().includes(busqueda)
          );
        } else if (d._tipo === 'acuerdo') {
          return (
            d.descripcion_acuerdo?.toLowerCase().includes(busqueda) ||
            d.responsable?.toLowerCase().includes(busqueda) ||
            d.numero_acuerdo?.toString().includes(busqueda)
          );
        } else if (d._tipo === 'documento') {
          return (
            d.nombre_archivo?.toLowerCase().includes(busqueda) ||
            d.descripcion?.toLowerCase().includes(busqueda)
          );
        }
        return false;
      });
    }

    return datos;
  }, [
    incluirSesiones,
    incluirAcuerdos,
    incluirDocumentos,
    filtroComite,
    filtroEjercicio,
    filtroTipoSesion,
    filtroIncluyeAnexos,
    filtroEstatus,
    filtroBusqueda,
    fechaDesde,
    fechaHasta,
  ]);

  // Paginación
  const totalPaginas = Math.ceil(datosCombinados.length / itemsPorPagina);
  const datosPaginados = datosCombinados.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  // Resetear página al cambiar filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [
    incluirSesiones,
    incluirAcuerdos,
    incluirDocumentos,
    filtroComite,
    filtroEjercicio,
    filtroTipoSesion,
    filtroIncluyeAnexos,
    filtroEstatus,
    filtroBusqueda,
    fechaDesde,
    fechaHasta,
  ]);

  const getEstatusColor = (estatus: string) => {
    switch (estatus) {
      case 'Completado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En Proceso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatFecha = (fecha: string) => {
    if (!fecha) return fecha;
    const partes = fecha.split('-');
    if (partes.length !== 3) {
      // Intentar el parseo original si no tiene formato esperado
      return new Date(fecha).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
    }
    
    const [year, month, day] = partes;
    const meses = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    const mesIndex = parseInt(month, 10) - 1;
    const mesStr = mesIndex >= 0 && mesIndex < 12 ? meses[mesIndex] : month;
    return `${day}-${mesStr}-${year}`;
  };

  const limpiarFiltros = () => {
    setFiltroComite('todos');
    setFiltroEjercicio('todos');
    setFiltroTipoSesion('todos');
    setFiltroIncluyeAnexos('todos');
    setFiltroEstatus('todos');
    setFiltroBusqueda('');
    setFechaDesde(undefined);
    setFechaHasta(undefined);
  };

  // Determinar qué tipo de tabla mostrar
  const tiposSeleccionados = [incluirSesiones, incluirAcuerdos, incluirDocumentos].filter(Boolean).length;
  const esTablaUnica = tiposSeleccionados === 1;

  // Tabla específica para solo Sesiones
  const renderTablaSesiones = () => {
    return renderTablaDinamica();
  };

  // Tabla específica para solo Acuerdos
  const renderTablaAcuerdos = () => {
    return renderTablaDinamica();
  };

  // Tabla específica para solo Documentos
  const renderTablaDocumentos = () => {
    return renderTablaDinamica();
  };

  // Tabla unificada con columnas dinámicas
  const renderTablaDinamica = () => {
    // Determinar qué columnas mostrar según lo seleccionado
    const columnas = [];
    
    // Siempre mostrar Tipo cuando hay múltiples tipos
    if (tiposSeleccionados > 1) {
      columnas.push({ key: 'tipo', label: 'Tipo', width: 'w-24' });
    }
    
    // Columnas de Sesiones
    if (incluirSesiones) {
      columnas.push(
        { key: 'numero_sesion', label: 'No. Sesión', width: 'w-28' },
        { key: 'tipo_sesion', label: 'Tipo de Sesión', width: 'w-32' },
        { key: 'nombre_acta', label: 'Nombre del Acta', width: 'w-64' },
        { key: 'incluye_anexos', label: 'Anexos', width: 'w-24' }
      );
    }
    
    // Columnas de Acuerdos
    if (incluirAcuerdos) {
      columnas.push(
        { key: 'numero_acuerdo', label: 'No. Acuerdo', width: 'w-28' },
        { key: 'descripcion_acuerdo', label: 'Descripción del Acuerdo', width: 'w-64' },
        { key: 'responsable', label: 'Responsable', width: 'w-40' },
        { key: 'estatus', label: 'Estatus', width: 'w-32' },
        { key: 'prioridad', label: 'Prioridad', width: 'w-28' }
      );
    }
    
    // Columnas de Documentos
    if (incluirDocumentos) {
      columnas.push(
        { key: 'nombre_archivo', label: 'Nombre del Archivo', width: 'w-48' },
        { key: 'tipo_documento', label: 'Tipo de Documento', width: 'w-40' },
        { key: 'descripcion_documento', label: 'Descripción del Documento', width: 'w-64' },
        { key: 'subido_por', label: 'Subido Por', width: 'w-40' }
      );
    }
    
    // Columnas comunes
    columnas.push(
      { key: 'comite', label: 'Comité', width: 'w-48' },
      { key: 'fecha', label: 'Fecha', width: 'w-36' },
      { key: 'ejercicio', label: 'Ejercicio', width: 'w-24' }
    );

    return (
      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  {columnas.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {datosPaginados.length === 0 ? (
                  <tr>
                    <td colSpan={columnas.length} className="px-4 py-12 text-center">
                      <FileBarChart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No se encontraron resultados</p>
                      <p className="text-sm text-gray-400 mt-1">Intenta ajustar los filtros de búsqueda</p>
                    </td>
                  </tr>
                ) : (
                  datosPaginados.map((dato: any, index: number) => {
                    const comite = comites.find((c) => c.id_comite === dato.id_comite);
                    return (
                      <tr key={`${dato._tipo}-${index}`} className="hover:bg-gray-50 transition-colors">
                        {columnas.map((col) => {
                          // Columna Tipo
                          if (col.key === 'tipo') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm font-medium">
                                <span
                                  className={
                                    dato._tipo === 'sesion'
                                      ? 'text-blue-700'
                                      : dato._tipo === 'acuerdo'
                                      ? 'text-green-700'
                                      : 'text-purple-700'
                                  }
                                >
                                  {dato._tipo === 'sesion'
                                    ? 'Sesión'
                                    : dato._tipo === 'acuerdo'
                                    ? 'Acuerdo'
                                    : 'Documento'}
                                </span>
                              </td>
                            );
                          }
                          
                          // Columna No. Sesión
                          if (col.key === 'numero_sesion') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm font-medium text-gray-900">
                                {dato._tipo === 'sesion' ? dato.numero_sesion : '—'}
                              </td>
                            );
                          }
                          
                          // Columna Tipo de Sesión
                          if (col.key === 'tipo_sesion') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm">
                                {dato._tipo === 'sesion' ? (
                                  <span
                                    className={
                                      dato.tipo_sesion === 'Ordinaria'
                                        ? 'text-blue-700 font-medium'
                                        : 'text-purple-700 font-medium'
                                    }
                                  >
                                    {dato.tipo_sesion}
                                  </span>
                                ) : (
                                  '—'
                                )}
                              </td>
                            );
                          }
                          
                          // Columna Nombre del Acta
                          if (col.key === 'nombre_acta') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm text-gray-900">
                                {dato._tipo === 'sesion' ? dato.nombre_acta : '—'}
                              </td>
                            );
                          }
                          
                          // Columna Incluye Anexos
                          if (col.key === 'incluye_anexos') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm">
                                {dato._tipo === 'sesion' ? (
                                  <span
                                    className={
                                      dato.incluye_anexos === 'Sí'
                                        ? 'text-green-700 font-medium'
                                        : 'text-gray-600 font-medium'
                                    }
                                  >
                                    {dato.incluye_anexos}
                                  </span>
                                ) : (
                                  '—'
                                )}
                              </td>
                            );
                          }
                          
                          // Columna No. Acuerdo
                          if (col.key === 'numero_acuerdo') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm font-medium text-gray-900">
                                {dato._tipo === 'acuerdo' ? dato.numero_acuerdo : '—'}
                              </td>
                            );
                          }
                          
                          // Columna Descripción del Acuerdo
                          if (col.key === 'descripcion_acuerdo') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm text-gray-900">
                                {dato._tipo === 'acuerdo' ? (
                                  <div className="max-w-xs truncate" title={dato.descripcion_acuerdo}>
                                    {dato.descripcion_acuerdo}
                                  </div>
                                ) : (
                                  '—'
                                )}
                              </td>
                            );
                          }
                          
                          // Columna Responsable
                          if (col.key === 'responsable') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm text-gray-700">
                                {dato._tipo === 'acuerdo' ? dato.responsable : '—'}
                              </td>
                            );
                          }
                          
                          // Columna Estatus
                          if (col.key === 'estatus') {
                            const getEstatusColorText = (estatus: string) => {
                              switch (estatus) {
                                case 'Completado':
                                  return 'text-green-700';
                                case 'En Proceso':
                                  return 'text-blue-700';
                                case 'Pendiente':
                                  return 'text-yellow-700';
                                case 'Cancelado':
                                  return 'text-red-700';
                                default:
                                  return 'text-gray-700';
                              }
                            };
                            
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm">
                                {dato._tipo === 'acuerdo' ? (
                                  <span className={`${getEstatusColorText(dato.estatus)} font-medium`}>
                                    {dato.estatus}
                                  </span>
                                ) : (
                                  '—'
                                )}
                              </td>
                            );
                          }
                          
                          // Columna Prioridad
                          if (col.key === 'prioridad') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm">
                                {dato._tipo === 'acuerdo' ? (
                                  <span
                                    className={
                                      dato.prioridad === 'Alta'
                                        ? 'text-red-700 font-medium'
                                        : dato.prioridad === 'Media'
                                        ? 'text-yellow-700 font-medium'
                                        : 'text-gray-600 font-medium'
                                    }
                                  >
                                    {dato.prioridad}
                                  </span>
                                ) : (
                                  '—'
                                )}
                              </td>
                            );
                          }
                          
                          // Columna Nombre del Archivo
                          if (col.key === 'nombre_archivo') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm font-medium text-gray-900">
                                {dato._tipo === 'documento' ? dato.nombre_archivo : '—'}
                              </td>
                            );
                          }
                          
                          // Columna Tipo de Documento
                          if (col.key === 'tipo_documento') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm">
                                {dato._tipo === 'documento' ? (
                                  <span className="text-purple-700 font-medium">
                                    {dato.tipo_documento}
                                  </span>
                                ) : (
                                  '—'
                                )}
                              </td>
                            );
                          }
                          
                          // Columna Descripción del Documento
                          if (col.key === 'descripcion_documento') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm text-gray-700">
                                {dato._tipo === 'documento' ? (
                                  <div className="max-w-xs truncate" title={dato.descripcion}>
                                    {dato.descripcion}
                                  </div>
                                ) : (
                                  '—'
                                )}
                              </td>
                            );
                          }
                          
                          // Columna Subido Por
                          if (col.key === 'subido_por') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm text-gray-700">
                                {dato._tipo === 'documento' ? dato.subido_por : '—'}
                              </td>
                            );
                          }
                          
                          // Columna Comité
                          if (col.key === 'comite') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm text-gray-900">
                                {comite?.nombre_comite || '—'}
                              </td>
                            );
                          }
                          
                          // Columna Fecha
                          if (col.key === 'fecha') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                {dato._tipo === 'sesion' && formatFecha(dato.fecha_sesion)}
                                {dato._tipo === 'acuerdo' && formatFecha(dato.fecha_sesion)}
                                {dato._tipo === 'documento' && formatFecha(dato.fecha_subida)}
                              </td>
                            );
                          }
                          
                          // Columna Ejercicio
                          if (col.key === 'ejercicio') {
                            return (
                              <td key={col.key} className="px-4 py-4 text-sm text-gray-600">
                                {dato._tipo === 'sesion' && dato.ejercicio}
                                {dato._tipo === 'acuerdo' && new Date(dato.fecha_sesion).getFullYear()}
                                {dato._tipo === 'documento' && new Date(dato.fecha_subida).getFullYear()}
                              </td>
                            );
                          }
                          
                          return <td key={col.key} className="px-4 py-4 text-sm">—</td>;
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const copiarAlPortapapeles = () => {
    // Crear columnas según lo seleccionado
    const columns = [];
    if (incluirAcuerdos) {
      columns.push(
        { key: 'numero_acuerdo', label: 'No. Acuerdo' },
        { key: 'descripcion_acuerdo', label: 'Descripción del Acuerdo' },
        { key: 'responsable', label: 'Responsable' },
        { key: 'estatus', label: 'Estatus' },
        { key: 'prioridad', label: 'Prioridad' }
      );
    }
    if (incluirDocumentos) {
      columns.push(
        { key: 'nombre_archivo', label: 'Nombre del Archivo' },
        { key: 'tipo_documento', label: 'Tipo de Documento' },
        { key: 'subido_por', label: 'Subido Por' }
      );
    }
    columns.push(
      { key: 'id_comite', label: 'Comité' },
      { key: 'fecha', label: 'Fecha' }
    );
    
    exportToClipboard({ data: datosCombinados, columns });
  };

  const exportarCSV = () => {
    // Crear columnas según lo seleccionado
    const columns = [];
    if (incluirAcuerdos) {
      columns.push(
        { key: 'numero_acuerdo', label: 'No. Acuerdo' },
        { key: 'descripcion_acuerdo', label: 'Descripción del Acuerdo' },
        { key: 'responsable', label: 'Responsable' },
        { key: 'estatus', label: 'Estatus' },
        { key: 'prioridad', label: 'Prioridad' }
      );
    }
    if (incluirDocumentos) {
      columns.push(
        { key: 'nombre_archivo', label: 'Nombre del Archivo' },
        { key: 'tipo_documento', label: 'Tipo de Documento' },
        { key: 'subido_por', label: 'Subido Por' }
      );
    }
    columns.push(
      { key: 'id_comite', label: 'Comité' },
      { key: 'fecha_sesion', label: 'Fecha' }
    );
    
    exportToCSV({ data: datosCombinados, columns, filename: 'reporte' });
  };

  const exportarExcel = () => {
    exportarExcelProfesional({
      datosCombinados,
      comites,
      incluirSesiones,
      incluirAcuerdos,
      incluirDocumentos,
      formatFecha,
    });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header con título y descripción */}
      <div className="bg-gradient-to-r from-[#7c2539] to-[#5a1a29] rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Generador de Reportes</h1>
            <p className="text-gray-100 text-sm opacity-90">
              Configura y genera reportes personalizados de sesiones, acuerdos y documentos
            </p>
          </div>
          <Button 
            onClick={exportarExcel}
            className="bg-white text-[#7c2539] hover:bg-gray-100 font-medium shadow-md"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte Completo
          </Button>
        </div>
      </div>

      {/* PASO 1: Selección de Tipos de Datos */}
      <Card className="border-l-4 border-l-blue-500 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm">
              1
            </div>
            <div>
              <CardTitle className="text-lg">Selecciona los datos a incluir</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Elige qué tipo de información deseas en tu reporte</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer",
                incluirSesiones 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
              onClick={() => !bloquearTipos && setIncluirSesiones(!incluirSesiones)}
            >
              <Checkbox
                id="incluir-sesiones"
                checked={incluirSesiones}
                onCheckedChange={(checked) => setIncluirSesiones(checked as boolean)}
                disabled={bloquearTipos}
              />
              <label
                htmlFor="incluir-sesiones"
                className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer flex-1"
              >
                <FileCheck className="w-4 h-4 text-blue-600" />
                Sesiones
              </label>
            </div>
            
            <div 
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer",
                incluirAcuerdos 
                  ? "border-green-500 bg-green-50" 
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
              onClick={() => !bloquearTipos && setIncluirAcuerdos(!incluirAcuerdos)}
            >
              <Checkbox
                id="incluir-acuerdos"
                checked={incluirAcuerdos}
                onCheckedChange={(checked) => setIncluirAcuerdos(checked as boolean)}
                disabled={bloquearTipos}
              />
              <label
                htmlFor="incluir-acuerdos"
                className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer flex-1"
              >
                <CheckSquare className="w-4 h-4 text-green-600" />
                Acuerdos
              </label>
            </div>
            
            <div 
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer",
                incluirDocumentos 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
              onClick={() => !bloquearTipos && setIncluirDocumentos(!incluirDocumentos)}
            >
              <Checkbox
                id="incluir-documentos"
                checked={incluirDocumentos}
                onCheckedChange={(checked) => setIncluirDocumentos(checked as boolean)}
                disabled={bloquearTipos}
              />
              <label
                htmlFor="incluir-documentos"
                className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer flex-1"
              >
                <FileText className="w-4 h-4 text-purple-600" />
                Documentos
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PASO 2: Filtros Avanzados */}
      <Card className="border-l-4 border-l-amber-500 shadow-md">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-sm">
                2
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5 text-amber-600" />
                  Filtros de Búsqueda
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Refina los resultados con filtros específicos</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={limpiarFiltros} className="text-amber-700 hover:text-amber-900 hover:bg-amber-100">
              <X className="w-4 h-4 mr-2" />
              Limpiar Filtros
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Filtro por Comité */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Comité</Label>
              <Select value={filtroComite} onValueChange={setFiltroComite} disabled={bloquearComite}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="todos-comites" value="todos">Todos los comités</SelectItem>
                  {comites.map((comite) => (
                    <SelectItem key={comite.id_comite} value={comite.id_comite.toString()}>
                      {comite.nombre_comite}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Ejercicio */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Ejercicio (Año)</Label>
              <Select value={filtroEjercicio} onValueChange={setFiltroEjercicio}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="todos-ejercicios" value="todos">Todos los ejercicios</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Tipo de Sesión */}
            {incluirSesiones && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Tipo de Sesión</Label>
                <Select value={filtroTipoSesion} onValueChange={setFiltroTipoSesion}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todos-tipos" value="todos">Todos los tipos</SelectItem>
                    <SelectItem key="ordinaria" value="Ordinaria">Ordinaria</SelectItem>
                    <SelectItem key="extraordinaria" value="Extraordinaria">Extraordinaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Filtro por Incluye Anexos */}
            {incluirSesiones && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Incluye Anexos</Label>
                <Select value={filtroIncluyeAnexos} onValueChange={setFiltroIncluyeAnexos}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todos-anexos" value="todos">Todos</SelectItem>
                    <SelectItem key="si-anexos" value="Sí">Sí</SelectItem>
                    <SelectItem key="no-anexos" value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Filtro por Estatus */}
            {incluirAcuerdos && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Estatus de Acuerdos</Label>
                <Select value={filtroEstatus} onValueChange={setFiltroEstatus}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todos-estatus" value="todos">Todos los estatus</SelectItem>
                    <SelectItem key="pendiente" value="Pendiente">Pendiente</SelectItem>
                    <SelectItem key="en-proceso" value="En Proceso">En Proceso</SelectItem>
                    <SelectItem key="completado" value="Completado">Completado</SelectItem>
                    <SelectItem key="cancelado" value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Filtros de Fecha en la misma línea */}
            <div className="space-y-2 md:col-span-2 lg:col-span-2">
              <Label className="text-sm font-medium text-gray-700">
                Rango de Fechas
                {fechasDeshabilitadas && <span className="ml-2 text-xs text-gray-500">(Controlado por Ejercicio)</span>}
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {/* Fecha Desde */}
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Desde</Label>
                  <Popover open={popoverFechaDesdeOpen} onOpenChange={setPopoverFechaDesdeOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={fechasDeshabilitadas}
                        className={cn(
                          'w-full justify-start text-left font-normal border-gray-300',
                          !fechaDesde && 'text-muted-foreground',
                          fechasDeshabilitadas && 'cursor-not-allowed opacity-60'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fechaDesde ? format(fechaDesde, 'dd/MM/yyyy', { locale: es }) : 'Seleccionar'}
                      </Button>
                    </PopoverTrigger>
                    {!fechasDeshabilitadas && (
                      <PopoverContent className="w-auto p-0 z-50" align="start" side="bottom" sideOffset={5}>
                        <CustomCalendar
                          mode="single"
                          selected={fechaDesde}
                          onSelect={(date) => {
                            setFechaDesde(date);
                            setPopoverFechaDesdeOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    )}
                  </Popover>
                </div>

                {/* Fecha Hasta */}
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Hasta</Label>
                  <Popover open={popoverFechaHastaOpen} onOpenChange={setPopoverFechaHastaOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={fechasDeshabilitadas}
                        className={cn(
                          'w-full justify-start text-left font-normal border-gray-300',
                          !fechaHasta && 'text-muted-foreground',
                          fechasDeshabilitadas && 'cursor-not-allowed opacity-60'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fechaHasta ? format(fechaHasta, 'dd/MM/yyyy', { locale: es }) : 'Seleccionar'}
                      </Button>
                    </PopoverTrigger>
                    {!fechasDeshabilitadas && (
                      <PopoverContent className="w-auto p-0 z-50" align="start" side="bottom" sideOffset={5}>
                        <CustomCalendar
                          mode="single"
                          selected={fechaHasta}
                          onSelect={(date) => {
                            setFechaHasta(date);
                            setPopoverFechaHastaOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    )}
                  </Popover>
                </div>
              </div>
            </div>

            {/* Búsqueda de Texto */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <Label className="text-sm font-medium text-gray-700">Búsqueda General</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar en nombre, descripción, responsable, etc..."
                  value={filtroBusqueda}
                  onChange={(e) => setFiltroBusqueda(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de Resultados */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm">
              ✓
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Se encontraron <span className="text-green-700 font-bold text-lg">{datosCombinados.length}</span> registro{datosCombinados.length !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Mostrando del {datosPaginados.length > 0 ? (paginaActual - 1) * itemsPorPagina + 1 : 0} al {Math.min(paginaActual * itemsPorPagina, datosCombinados.length)}
              </p>
            </div>
          </div>
          
          {/* Controles de paginación compactos */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Mostrar</span>
              <Select value={itemsPorPagina.toString()} onValueChange={(value) => setItemsPorPagina(Number(value))}>
                <SelectTrigger className="w-[70px] h-8 text-xs border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="10" value="10">10</SelectItem>
                  <SelectItem key="25" value="25">25</SelectItem>
                  <SelectItem key="50" value="50">50</SelectItem>
                  <SelectItem key="100" value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-gray-600">por página</span>
            </div>

            {/* Botones de exportación compactos */}
            <div className="border-l pl-3 border-gray-300">
              <ExportButtons
                onCopy={copiarAlPortapapeles}
                onExportCSV={exportarCSV}
                onExportExcel={exportarExcel}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Resultados */}
      {esTablaUnica ? (
        incluirSesiones ? renderTablaSesiones() :
        incluirAcuerdos ? renderTablaAcuerdos() :
        incluirDocumentos ? renderTablaDocumentos() :
        null
      ) : renderTablaDinamica()}

      {/* Paginación y controles inferiores */}
      <Card className="shadow-sm">
        <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Página <span className="font-semibold text-gray-900">{paginaActual}</span> de <span className="font-semibold text-gray-900">{totalPaginas}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
                  disabled={paginaActual === 1}
                  className="border-gray-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))}
                  disabled={paginaActual === totalPaginas || totalPaginas === 0}
                  className="border-gray-300"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Footer con botón de exportación final */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button 
          onClick={exportarExcel}
          className="bg-gradient-to-r from-[#7c2539] to-[#5a1a29] hover:from-[#6a1f30] hover:to-[#4a1520] text-white shadow-md"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Reporte Completo
        </Button>
      </div>
    </div>
  );
}