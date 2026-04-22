import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Eye, FolderOpen, Pencil } from 'lucide-react';
import { DataTable, DataTableColumn, DataTableAction } from './DataTable';
import { GeneradorReportesSesiones } from './GeneradorReportesSesiones';
import { GeneradorReportesAcuerdos } from './GeneradorReportesAcuerdos';
import { RegistroSesionesForm } from './RegistroSesionesForm';
import { RegistroAcuerdosForm } from './RegistroAcuerdosForm';
import { EstadisticasComite } from './EstadisticasComite';
import { ModificarSesionDialog } from './ModificarSesionDialog';
import { ModificarAcuerdoDialog } from './ModificarAcuerdoDialog';
import { TextoConReferencias, SeccionReferencias } from './ReferenciasNumeradas';
import type { ComiteId, SeccionComite } from '../../types/routes';
import type { Integrante, SesionData, AcuerdoData } from '../../data/comitesData';
import {
  comiteTecnicoData,
  comiteAdquisicionesData,
  comiteAuditoriaData,
  comiteCalidadData,
} from '../../data/comitesData';
import { cn, formatFechaStr } from '../../lib/utils';

interface ComiteSeccionViewProps {
  comiteId: ComiteId;
  seccionId: SeccionComite;
  comiteNombre: string;
}

export function ComiteSeccionView({
  comiteId,
  seccionId,
  comiteNombre,
}: ComiteSeccionViewProps) {
  const [vistaActiva, setVistaActiva] = useState<'tabla' | 'registro' | 'reportes' | 'estadisticas'>('tabla');
  const [sesionSeleccionada, setSesionSeleccionada] = useState<SesionData | null>(null);
  const [mostrarDialogoSesion, setMostrarDialogoSesion] = useState(false);
  const [acuerdoSeleccionado, setAcuerdoSeleccionado] = useState<AcuerdoData | null>(null);
  const [mostrarDialogoAcuerdo, setMostrarDialogoAcuerdo] = useState(false);

  // Obtener datos del comité
  const getComiteData = () => {
    switch (comiteId) {
      case 'tecnico':
        return comiteTecnicoData;
      case 'adquisiciones':
        return comiteAdquisicionesData;
      case 'auditoria':
        return comiteAuditoriaData;
      case 'calidad':
        return comiteCalidadData;
      default:
        return comiteTecnicoData;
    }
  };

  const comiteData = getComiteData();

  // Renderizar contenido según la sección
  const renderSeccionContent = () => {
    switch (seccionId) {
      case 'antecedentes':
        return renderAntecedentes();
      case 'lineamientos':
        return renderLineamientos();
      case 'integracion':
        return renderIntegracion();
      case 'atribuciones':
      case 'funciones':
        return renderAtribucionesFunciones();
      case 'sesiones':
        return renderSesiones();
      case 'acuerdos':
        return renderAcuerdos();
      default:
        return <p>Sección en desarrollo...</p>;
    }
  };

  const renderAntecedentes = () => {
    const data = comiteData.antecedentes;
    
    // Verificar si tiene estructura extendida (Comité Técnico)
    const tieneTablaCreacion = (data as any).tablaCreacion;
    const textoLegal = (data as any).textoLegal;
    
    return (
      <div className="space-y-6">
        {/* Texto principal */}
        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              <TextoConReferencias texto={data.texto} referencias={[]} />
            </div>
          </CardContent>
        </Card>

        {/* Tabla de creación (solo Comité Técnico) */}
        {tieneTablaCreacion && (
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6">
              <p className="mb-4"><strong>{tieneTablaCreacion.titulo}</strong></p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-center">Denominación</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tieneTablaCreacion.filas.map((fila: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{fila.denominacion}</td>
                        <td className="border border-gray-300 px-4 py-2">{fila.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Texto legal (solo Comité Técnico) */}
        {textoLegal && (
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6">
              <div className="prose max-w-none space-y-4">
                {textoLegal.split('\n\n').map((parrafo: string, index: number) => {
                  // Detectar si es un artículo (comienza con **Artículo)
                  if (parrafo.trim().startsWith('**Artículo')) {
                    // Separar el título del artículo del contenido
                    const match = parrafo.match(/\*\*(.*?)\*\*(.*)/s);
                    if (match) {
                      const titulo = match[1];
                      const contenido = match[2].trim();
                      
                      // Dividir el contenido en líneas
                      const lineas = contenido.split('\n').filter(line => line.trim());
                      
                      return (
                        <div key={index} className="space-y-2">
                          <p className="text-gray-700 leading-relaxed">
                            <strong>{titulo}</strong> {lineas[0]}
                          </p>
                          {lineas.slice(1).map((linea, idx) => {
                            // Detectar si es un inciso romano (I., II., etc.)
                            const esInciso = /^(I{1,3}|IV|V|VI{0,3}|IX|X)\.\s/.test(linea);
                            return (
                              <p key={idx} className={`text-gray-700 leading-relaxed ${esInciso ? 'pl-6' : ''}`}>
                                {esInciso ? <strong>{linea.match(/^(I{1,3}|IV|V|VI{0,3}|IX|X)\./)?.[0]}</strong> : ''}{' '}
                                {linea.replace(/^(I{1,3}|IV|V|VI{0,3}|IX|X)\.\s/, '')}
                              </p>
                            );
                          })}
                        </div>
                      );
                    }
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        <strong>{parrafo.split('**')[1]}</strong>
                        {parrafo.split('**').slice(2).join('**')}
                      </p>
                    );
                  }
                  
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {parrafo}
                    </p>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fuentes */}
        {data.fuentes && data.fuentes.length > 0 && (
          <Card className="border-2 border-gray-200 shadow-md bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#6F7271] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="mb-2">
                    <strong>Fuente:</strong>
                  </p>
                  <ul className="space-y-1">
                    {data.fuentes.map((fuente: string, index: number) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-[#6F7271] hover:text-[#13322e] hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('Abrir PDF:', fuente);
                          }}
                        >
                          {fuente}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderLineamientos = () => {
    const data = comiteData.lineamientos;
    return (
      <div className="space-y-6">
        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="prose max-w-none space-y-4">
              {Array.isArray(data.contenido) ? (
                <ul className="space-y-2 list-disc list-inside">
                  {data.contenido.map((item, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 leading-relaxed">{data.contenido}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {data.fuentes && data.fuentes.length > 0 && (
          <Card className="border-2 border-gray-200 shadow-md bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#6F7271] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="mb-2">
                    <strong>Fuente:</strong>
                  </p>
                  <ul className="space-y-1">
                    {data.fuentes.map((fuente: string, index: number) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-[#6F7271] hover:text-[#13322e] hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('Abrir PDF:', fuente);
                          }}
                        >
                          {fuente}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderIntegracion = () => {
    // Manejar formato de objeto con miembros o array directo
    const integracionData = comiteData.integracion as any;
    const integrantes = (integracionData && typeof integracionData === 'object' && !Array.isArray(integracionData) && 'miembros' in integracionData)
      ? integracionData.miembros 
      : (integracionData as Integrante[]);

    const columns: DataTableColumn<Integrante>[] = [
      { key: 'cargo', label: 'Cargo', className: 'font-medium' },
      { key: 'nombre', label: 'Nombre', render: (value) => value || '—' },
      { key: 'puesto', label: 'Puesto' },
    ];

    return (
      <DataTable
        columns={columns}
        data={integrantes}
        searchable={true}
        searchPlaceholder="Buscar integrante..."
        exportable={true}
      />
    );
  };

  const renderAtribucionesFunciones = () => {
    const data = (comiteData as any).atribuciones || (comiteData as any).funciones;
    
    return (
      <div className="space-y-6">
        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="prose max-w-none space-y-4">
              {Array.isArray(data.contenido) ? (
                <ol className="space-y-3">
                  {data.contenido.map((item: any, index: number) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      {item.numero && <strong className="text-[#0F1B2A]">{item.numero}.</strong>}{' '}
                      {item.texto || item}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-700 leading-relaxed">{data.contenido}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {data.fuentes && data.fuentes.length > 0 && (
          <Card className="border-2 border-gray-200 shadow-md bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#6F7271] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="mb-2">
                    <strong>Fuente:</strong>
                  </p>
                  <ul className="space-y-1">
                    {data.fuentes.map((fuente: string, index: number) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-[#6F7271] hover:text-[#13322e] hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('Abrir PDF:', fuente);
                          }}
                        >
                          {fuente}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderSesiones = () => {
    if (vistaActiva === 'registro') {
      return (
        <RegistroSesionesForm
          comiteNombre={comiteNombre}
          comiteId={comiteId}
          onBack={() => setVistaActiva('tabla')}
        />
      );
    }

    if (vistaActiva === 'reportes') {
      return (
        <GeneradorReportesSesiones
          comiteNombre={comiteNombre}
          onBack={() => setVistaActiva('tabla')}
        />
      );
    }

    const sesiones = comiteData.sesiones as SesionData[];

    const columns: DataTableColumn<SesionData>[] = [
      { key: 'numeroSesion', label: 'Sesión No.', className: 'font-medium' },
      { key: 'nombreSesion', label: 'Sesión' },
      { key: 'tipoSesion', label: 'T. Sesión' },
      { key: 'fecha', label: 'Fecha', className: 'whitespace-nowrap', render: (value) => formatFechaStr(value as string) },
      { 
        key: 'acta', 
        label: 'Acta',
        render: (value) => (
          <button
            onClick={() => console.log('Ver acta:', value)}
            className="text-[#08546C] hover:text-[#06445a] transition-colors"
            title="Ver acta"
          >
            <Eye className="w-5 h-5" />
          </button>
        ),
        className: 'text-center'
      },
      { 
        key: 'carpeta', 
        label: 'Carpeta',
        render: (value) => (
          <button
            onClick={() => console.log('Ver carpeta:', value)}
            className="text-[#08546C] hover:text-[#06445a] transition-colors"
            title="Ver carpeta"
          >
            <FolderOpen className="w-5 h-5" />
          </button>
        ),
        className: 'text-center'
      },
      { 
        key: 'anexos', 
        label: 'Anexos',
        render: (value) => value || 'No',
        className: 'text-center'
      },
    ];

    const actions: DataTableAction[] = [
      {
        icon: 'edit',
        label: 'Actualizar',
        onClick: (row) => {
          setSesionSeleccionada(row as SesionData);
          setMostrarDialogoSesion(true);
        },
        className: 'text-[#1A2436] hover:text-[#0F1B2A]',
      },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setVistaActiva('registro')}
            className="bg-gradient-to-r from-[#1A2436] to-[#0F1B2A] hover:from-[#0F1B2A] hover:to-[#1A2436] text-white"
          >
            Registro de Sesiones
          </Button>
          <Button
            onClick={() => setVistaActiva('reportes')}
            variant="outline"
            className="border-[#1A2436] text-[#1A2436] hover:bg-[#1A2436] hover:text-white"
          >
            Generador de Reportes
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={sesiones}
          actions={actions}
          searchable={true}
          searchPlaceholder="Buscar sesión..."
          exportable={true}
        />

        {mostrarDialogoSesion && sesionSeleccionada && (
          <ModificarSesionDialog
            sesion={sesionSeleccionada}
            comiteNombre={comiteNombre}
            open={mostrarDialogoSesion}
            onOpenChange={setMostrarDialogoSesion}
          />
        )}
      </div>
    );
  };

  const renderAcuerdos = () => {
    if (vistaActiva === 'registro') {
      return (
        <RegistroAcuerdosForm
          comiteNombre={comiteNombre}
          comiteId={comiteId}
          onBack={() => setVistaActiva('tabla')}
        />
      );
    }

    if (vistaActiva === 'reportes') {
      return (
        <GeneradorReportesAcuerdos
          comiteNombre={comiteNombre}
          onBack={() => setVistaActiva('tabla')}
        />
      );
    }

    if (vistaActiva === 'estadisticas') {
      return (
        <EstadisticasComite
          comiteNombre={comiteNombre}
          onBack={() => setVistaActiva('tabla')}
        />
      );
    }

    const acuerdos = comiteData.acuerdos as AcuerdoData[];

    const columns: DataTableColumn<AcuerdoData>[] = [
      { key: 'numeroSesion', label: 'Sesión No.' },
      { key: 'nombreSesion', label: 'Sesión' },
      { key: 'tipoSesion', label: 'T. Sesión' },
      { key: 'fecha', label: 'Fecha', className: 'whitespace-nowrap', render: (value) => formatFechaStr(value as string) },
      { key: 'resolucion', label: 'Resolución / Acuerdo' },
      { key: 'tema', label: 'Tema' },
      { key: 'acuerdo', label: 'Acuerdo', className: 'max-w-md truncate' },
      { 
        key: 'estatus', 
        label: 'Estatus',
        render: (value) => (
          <span className={cn(
            'px-2 py-1 rounded text-xs',
            value === 'Aprobado' && 'bg-green-100 text-green-800',
            value === 'Autorizado' && 'bg-blue-100 text-blue-800',
            value === 'En Proceso' && 'bg-yellow-100 text-yellow-800',
            value === 'Pendiente' && 'bg-orange-100 text-orange-800'
          )}>
            {value}
          </span>
        ),
      },
    ];

    const actions: DataTableAction[] = [
      {
        icon: 'edit',
        label: 'Actualizar',
        onClick: (row) => {
          setAcuerdoSeleccionado(row as AcuerdoData);
          setMostrarDialogoAcuerdo(true);
        },
        className: 'text-[#7c2539] hover:text-[#5d1b2a]',
      },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setVistaActiva('registro')}
            className="bg-gradient-to-r from-[#7c2539] to-[#5d1b2a] hover:from-[#5d1b2a] hover:to-[#7c2539] text-white"
          >
            Registro de Acuerdos
          </Button>
          <Button
            onClick={() => setVistaActiva('reportes')}
            variant="outline"
            className="border-[#7c2539] text-[#7c2539] hover:bg-[#7c2539] hover:text-white"
          >
            Generador de Reportes
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={acuerdos}
          actions={actions}
          searchable={true}
          searchPlaceholder="Buscar acuerdo..."
          exportable={true}
        />

        {mostrarDialogoAcuerdo && acuerdoSeleccionado && (
          <ModificarAcuerdoDialog
            acuerdo={acuerdoSeleccionado}
            comiteNombre={comiteNombre}
            open={mostrarDialogoAcuerdo}
            onOpenChange={setMostrarDialogoAcuerdo}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderSeccionContent()}
    </div>
  );
}