// Componente COMPLETO para visualizar todas las secciones de los comités
// Basado en las 42 páginas del documento "Diagramas subdata" con contenido exacto

import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Eye, FolderOpen, Pencil, Edit3 } from 'lucide-react';
import { DataTable, DataTableColumn, DataTableAction } from './DataTable';
import { GeneradorReportesSesiones } from './GeneradorReportesSesiones';
import { GeneradorReportesAcuerdos } from './GeneradorReportesAcuerdos';
import { RegistroSesionesForm } from './RegistroSesionesForm';
import { RegistroAcuerdosForm } from './RegistroAcuerdosForm';
import { EstadisticasComite } from './EstadisticasComite';
import { ModificarSesionDialog } from './ModificarSesionDialog';
import { ModificarAcuerdoDialog } from './ModificarAcuerdoDialog';
import { TextoConReferencias, SeccionReferencias, CajaArticulo } from './ReferenciasNumeradas';
import { formatFechaStr } from '../../lib/utils';
import type { ComiteId, SeccionComite } from '../../types/routes';
import type { Integrante, SesionData, AcuerdoData } from '../../data/comitesDataComplete';
import {
  comiteTecnicoData,
  comiteAdquisicionesData,
  comiteAuditoriaData,
  comiteCalidadData,
} from '../../data/comitesDataComplete';

interface ComiteSeccionCompletaProps {
  comiteId: ComiteId;
  seccionId: SeccionComite;
  comiteNombre: string;
  onNavigateToReportes?: (params: {
    comiteId?: number;
    tipoSesiones?: boolean;
    tipoAcuerdos?: boolean;
    tipoDocumentos?: boolean;
  }) => void;
  onVistaChange?: (vista: 'tabla' | 'registro' | 'reportes' | 'estadisticas') => void;
  vistaActiva?: 'tabla' | 'registro' | 'reportes' | 'estadisticas';
}

export function ComiteSeccionCompleta({
  comiteId,
  seccionId,
  comiteNombre,
  onNavigateToReportes,
  onVistaChange,
  vistaActiva: vistaActivaProp,
}: ComiteSeccionCompletaProps) {
  const [vistaActivaLocal, setVistaActivaLocal] = useState<'tabla' | 'registro' | 'reportes' | 'estadisticas'>('tabla');
  const [sesionSeleccionada, setSesionSeleccionada] = useState<SesionData | null>(null);
  const [acuerdoSeleccionado, setAcuerdoSeleccionado] = useState<AcuerdoData | null>(null);
  const [modificarDialogOpen, setModificarDialogOpen] = useState(false);
  const [modificarAcuerdoDialogOpen, setModificarAcuerdoDialogOpen] = useState(false);

  // Usar vista controlada si se proporciona, sino usar estado local
  const vistaActiva = vistaActivaProp !== undefined ? vistaActivaProp : vistaActivaLocal;
  const setVistaActiva = (vista: 'tabla' | 'registro' | 'reportes' | 'estadisticas') => {
    if (onVistaChange) {
      onVistaChange(vista);
    } else {
      setVistaActivaLocal(vista);
    }
  };

  // Helper function to render text with Roman numerals in bold
  const renderTextWithBoldRomanNumerals = (text: string) => {
    // Regex to match Roman numerals followed by a period (I., II., III., etc.)
    const romanNumeralRegex = /\b(I{1,3}|IV|V|VI{0,3}|IX|X{1,3}|XI{1,3}|XI{0,3}V|X{0,3}I{1,3}X|XX|XXI{1,3}|XXI{0,3}V)\.\s/g;
    
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    
    while ((match = romanNumeralRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Add the Roman numeral in bold
      parts.push(<strong key={key++}>{match[0]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

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

  // ===============================================
  // RENDERIZAR ANTECEDENTES
  // ===============================================
  const renderAntecedentes = () => {
    const data = comiteData.antecedentes;
    
    if (!data) {
      return <p className="text-gray-500">No hay información de antecedentes disponible.</p>;
    }

    // Comité Técnico tiene estructura extendida
    if (comiteId === 'tecnico') {
      const tecnicoData = data as typeof comiteTecnicoData.antecedentes;
      
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-4">
              {tecnicoData.parrafos && tecnicoData.parrafos.map((parrafo, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  <TextoConReferencias 
                    texto={parrafo.texto} 
                    referencias={parrafo.referencias} 
                  />
                </p>
              ))}

              {/* Tabla de Creación */}
              <div className="mt-8">
                <p className="mb-4"><strong>{tecnicoData.tablaCreacion.titulo}</strong></p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        {tecnicoData.tablaCreacion.columnas && tecnicoData.tablaCreacion.columnas.map((col, idx) => (
                          <th key={idx} className="border border-gray-300 px-4 py-2 text-center">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tecnicoData.tablaCreacion.filas && tecnicoData.tablaCreacion.filas.map((fila, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">{fila.denominacion}</td>
                          <td className="border border-gray-300 px-4 py-2">{fila.fecha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Parrafos legales */}
              <div className="mt-8 space-y-4">
                {tecnicoData.parrafosLegales && tecnicoData.parrafosLegales.map((parrafo, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed">
                    <TextoConReferencias 
                      texto={parrafo.texto} 
                      referencias={parrafo.referencias} 
                    />
                  </p>
                ))}
              </div>

              {/* Artículos Legales */}
              {tecnicoData.articulosLegales && tecnicoData.articulosLegales.map((art, idx) => (
                <div key={idx} className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontStyle: 'italic' }}>
                    <strong style={{ fontStyle: 'italic' }}>{art.titulo}</strong> <span style={{ fontStyle: 'italic' }}>{renderTextWithBoldRomanNumerals(art.contenido)}</span>
                  </p>
                </div>
              ))}

              {/* Texto de transición */}
              {tecnicoData.textoTransicion && (
                <p className="mt-6 text-gray-700 leading-relaxed">
                  <TextoConReferencias 
                    texto={tecnicoData.textoTransicion} 
                    referencias={[]} 
                  />
                </p>
              )}

              {/* Segundo grupo de artículos legales */}
              {tecnicoData.articulosLegales2 && tecnicoData.articulosLegales2.map((art, idx) => (
                <div key={idx} className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontStyle: 'italic' }}>
                    <strong style={{ fontStyle: 'italic' }}>{art.titulo}</strong> <span style={{ fontStyle: 'italic' }}>{renderTextWithBoldRomanNumerals(art.contenido)}</span>
                  </p>
                </div>
              ))}

              {/* Párrafos de cierre */}
              <div className="mt-8 space-y-4">
                {tecnicoData.parrafosCierre && tecnicoData.parrafosCierre.map((parrafo, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed">
                    <TextoConReferencias 
                      texto={parrafo.texto} 
                      referencias={parrafo.referencias} 
                    />
                  </p>
                ))}
              </div>

              {/* Sección Ley Orgánica */}
              {tecnicoData.seccionLeyOrganica && (
                <div className="mt-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {tecnicoData.seccionLeyOrganica.introduccion}
                  </p>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      <TextoConReferencias 
                        texto={tecnicoData.seccionLeyOrganica.contenido} 
                        referencias={[tecnicoData.seccionLeyOrganica.referencia]} 
                      />
                    </p>
                  </div>
                </div>
              )}

              {/* Referencias */}
              {tecnicoData.referencias && <SeccionReferencias referencias={tecnicoData.referencias} />}
            </CardContent>
          </Card>
        </div>
      );
    }

    // Comité de Adquisiciones tiene Marco Legal
    if (comiteId === 'adquisiciones') {
      const adqData = data as typeof comiteAdquisicionesData.antecedentes;
      
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Párrafos */}
              {adqData.parrafos && adqData.parrafos.map((parrafo, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  <TextoConReferencias 
                    texto={parrafo.texto} 
                    referencias={parrafo.referencias} 
                  />
                </p>
              ))}

              {/* Cajas de Artículos sin itálica */}
              {adqData.cajasArticulos && adqData.cajasArticulos.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {adqData.cajasArticulos.map((art, idx) => (
                    <div key={idx} className="bg-blue-100 border-2 border-blue-300 rounded-lg p-6">
                      <p className="mb-3">
                        <strong>{art.titulo}</strong>
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {art.contenido}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {adqData.referencias && <SeccionReferencias referencias={adqData.referencias} />}
            </CardContent>
          </Card>
        </div>
      );
    }

    // Comité de Auditoría y Calidad - estructura simple
    const simpleData = data as typeof comiteAuditoriaData.antecedentes;
    
    return (
      <div className="space-y-6">
        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6 space-y-4">
            {simpleData.parrafos && simpleData.parrafos.map((parrafo, idx) => (
              <p 
                key={idx} 
                className={`text-gray-700 leading-relaxed ${parrafo.enfasis ? 'italic' : ''}`}
              >
                <TextoConReferencias 
                  texto={parrafo.texto} 
                  referencias={parrafo.referencias} 
                />
              </p>
            ))}
            {simpleData.referencias && <SeccionReferencias referencias={simpleData.referencias} />}
          </CardContent>
        </Card>
      </div>
    );
  };

  // ===============================================
  // RENDERIZAR LINEAMIENTOS
  // ===============================================
  const renderLineamientos = () => {
    const data = comiteData.lineamientos;

    // Comité Técnico tiene estructura de Artículo 18
    if (comiteId === 'tecnico') {
      const tecnicoData = data as typeof comiteTecnicoData.lineamientos;
      
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-4">
              {/* Párrafos introductorios */}
              {tecnicoData.parrafosIntroductorios?.map((parrafo: any, idx: number) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  <TextoConReferencias 
                    texto={parrafo.texto} 
                    referencias={parrafo.referencias} 
                  />
                </p>
              ))}

              {/* Párrafo sobre el Reglamento */}
              {tecnicoData.parrafoReglamento && (
                <p className="text-gray-700 leading-relaxed">
                  <TextoConReferencias 
                    texto={tecnicoData.parrafoReglamento.texto} 
                    referencias={tecnicoData.parrafoReglamento.referencias} 
                  />
                </p>
              )}

              {/* Artículo 18 */}
              <div className="mt-6 p-6 bg-blue-50 rounded-lg">
                <p className="mb-2" style={{ fontStyle: 'italic' }}><strong>{tecnicoData.articulo18.titulo}.-</strong> <em>{tecnicoData.articulo18.subtitulo}</em></p>
                <ul className="space-y-3 mt-4">
                  {tecnicoData.articulo18.fracciones.map((frac: string, idx: number) => (
                    <li key={idx} className="text-gray-700 leading-relaxed" style={{ fontStyle: 'italic' }}>
                      <strong>{['I', 'II', 'III', 'IV', 'V', 'VI'][idx]}.</strong> {frac}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Párrafo de cierre */}
              {tecnicoData.parrafoCierre && (
                <p className="text-gray-700 leading-relaxed">
                  {tecnicoData.parrafoCierre.texto}
                </p>
              )}

              {/* Lista de ordenamientos jurídicos */}
              {tecnicoData.ordenamientos && (
                <ul className="space-y-4 mt-4">
                  {tecnicoData.ordenamientos.map((ord: any, idx: number) => (
                    <li key={idx} className="space-y-1">
                      <p className="text-blue-600 hover:underline cursor-pointer">
                        <TextoConReferencias 
                          texto={ord.urlTexto} 
                          referencias={ord.referencias} 
                        />
                      </p>
                      {Array.isArray(ord.articulos) ? (
                        <ul className="ml-6 space-y-1">
                          {ord.articulos.map((art: string, artIdx: number) => (
                            <li key={artIdx} className="text-gray-700 text-sm list-disc">{art}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="ml-6 text-gray-700 text-sm">{ord.articulos}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <SeccionReferencias referencias={tecnicoData.referencias} />
            </CardContent>
          </Card>
        </div>
      );
    }

    // Comité de Auditoría tiene artículos extensos
    if (comiteId === 'auditoria') {
      const audData = data as typeof comiteAuditoriaData.lineamientos;
      
      return (
        <div className="space-y-6">
          {/* Texto introductorio con referencias */}
          {audData.parrafos && audData.parrafos.length > 0 && audData.parrafos.map((parrafo, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed">
              <TextoConReferencias 
                texto={parrafo.texto} 
                referencias={parrafo.referencias} 
              />
            </p>
          ))}

          {/* TODOS los artículos en UN SOLO recuadro azul - SIN título interno */}
          {audData.articulos && audData.articulos.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#4A90E2] p-6 rounded-lg shadow-sm space-y-6">
              {audData.articulos.map((art, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontStyle: 'italic' }}>
                  <strong style={{ fontStyle: 'italic' }}>Artículo {art.numero}.-</strong>{' '}
                  <span style={{ fontStyle: 'italic' }}>{art.contenido}</span>
                </p>
              ))}
            </div>
          )}

          {/* Referencias (Fuentes Documentales) */}
          {audData.referencias && <SeccionReferencias referencias={audData.referencias} />}
        </div>
      );
    }

    // Comités simple (Adquisiciones y Calidad)
    // Caso especial: Adquisiciones tiene estructura completa con artículos
    if (comiteId === 'adquisiciones') {
      const adqData = data as typeof comiteAdquisicionesData.lineamientos;
      
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Párrafos */}
              {adqData.parrafos?.map((parrafo, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed text-justify">
                  <TextoConReferencias 
                    texto={parrafo.texto} 
                    referencias={parrafo.referencias} 
                  />
                </p>
              ))}

              {/* Marco Legal con diseño mejorado */}
              {adqData.marcoLegal && (
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#4A90E2] p-6 rounded-lg shadow-sm">
                  <p className="mb-4 text-base"><strong>{adqData.marcoLegal.titulo}</strong></p>
                  <ul className="space-y-3 list-disc list-inside ml-2">
                    {adqData.marcoLegal.documentos.map((doc, idx) => (
                      <li key={idx} className="text-gray-700 leading-relaxed">
                        {typeof doc === 'string' ? doc : (
                          <>
                            <span className="text-blue-600 hover:underline cursor-pointer">{doc.titulo}</span>
                            {doc.articulo && <span className="text-gray-600 text-sm ml-2">({doc.articulo})</span>}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Párrafo Final */}
              {adqData.parrafoFinal && (
                <p className="text-gray-700 leading-relaxed mt-8 text-justify">
                  <TextoConReferencias 
                    texto={adqData.parrafoFinal.texto} 
                    referencias={adqData.parrafoFinal.referencias} 
                  />
                </p>
              )}

              <SeccionReferencias referencias={adqData.referencias} />
            </CardContent>
          </Card>
        </div>
      );
    }

    // Comité de Calidad - estructura simple
    const simpleData = data as any;
    
    return (
      <div className="space-y-6">
        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6 space-y-4">
            {simpleData.subtitulo && (
              <p className="mb-4"><strong>{simpleData.subtitulo}</strong></p>
            )}
            {typeof simpleData.contenido === 'string' ? (
              <p className="text-gray-700 leading-relaxed">{simpleData.contenido}</p>
            ) : Array.isArray(simpleData.contenido) ? (
              <ul className="space-y-2 list-disc list-inside">
                {simpleData.contenido.map((item: string, idx: number) => (
                  <li key={idx} className="text-gray-700 leading-relaxed">{item}</li>
                ))}
              </ul>
            ) : null}
            <SeccionReferencias referencias={simpleData.referencias} />
          </CardContent>
        </Card>
      </div>
    );
  };

  // ===============================================
  // RENDERIZAR INTEGRACIÓN
  // ===============================================
  const renderIntegracion = () => {
    // Manejar formato de objeto con textoIntroductorio (Comité de Auditoría) o array directo
    const integracionData = comiteData.integracion as any;
    const tieneTextoIntroductorio = integracionData && typeof integracionData === 'object' && 'textoIntroductorio' in integracionData;
    const integrantes = tieneTextoIntroductorio ? integracionData.miembros : (integracionData as Integrante[]);

    // Comité de Adquisiciones tiene estructura especial con artículo primero
    if (comiteId === 'adquisiciones') {
      const adqData = comiteData as typeof comiteAdquisicionesData;
      
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Texto introductorio */}
              {adqData.integracionIntro && (
                <p className="text-gray-700 leading-relaxed">
                  <TextoConReferencias 
                    texto={adqData.integracionIntro.texto} 
                    referencias={adqData.integracionIntro.referencias} 
                  />
                </p>
              )}

              {/* Artículo Primero en caja azul */}
              {adqData.articuloPrimero && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed" style={{ fontStyle: 'italic' }}>
                    <strong style={{ fontStyle: 'italic' }}>{adqData.articuloPrimero.titulo}.-</strong> <span style={{ fontStyle: 'italic' }}>
                      <TextoConReferencias 
                        texto={adqData.articuloPrimero.contenido} 
                        referencias={adqData.articuloPrimero.referencias} 
                      />
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabla de Integrantes con estructura titular + suplente */}
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6">
              <h3 className="mb-4 font-bold">Integrantes</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full border-collapse min-w-[800px]">{/* min-width para forzar scroll en móvil */}
                  <thead>
                    <tr>
                      <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Cargo</th>
                      <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Nombre</th>
                      <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Puesto</th>
                      <th className="bg-[#b5c4c9] text-gray-800 border border-gray-300 px-4 py-2 text-center">Cargo</th>
                      <th className="bg-[#b5c4c9] text-gray-800 border border-gray-300 px-4 py-2 text-center">Nombre</th>
                      <th className="bg-[#b5c4c9] text-gray-800 border border-gray-300 px-4 py-2 text-center">Puesto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {integrantes.map((integrante: any, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">{integrante.cargo}</td>
                        <td className="border border-gray-300 px-4 py-2">{integrante.nombre || '-'}</td>
                        <td className="border border-gray-300 px-4 py-2">{integrante.puesto}</td>
                        <td className="border border-gray-300 px-4 py-2 font-medium">
                          {integrante.suplente ? (integrante.suplente.cargo || `Suplente del ${integrante.cargo}`) : `Suplente del ${integrante.cargo}`}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {integrante.suplente ? integrante.suplente.nombre : '-'}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {integrante.suplente ? integrante.suplente.puesto : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Sección de Invitados */}
          {adqData.invitados && (
            <Card className="border-2 border-gray-200 shadow-md">
              <CardContent className="p-6">
                <h3 className="mb-4 font-bold">{adqData.invitados.titulo}</h3>
                <div className="space-y-4">
                  {adqData.invitados.parrafos.map((parrafo, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed text-justify">
                      <TextoConReferencias 
                        texto={parrafo.texto} 
                        referencias={parrafo.referencias} 
                      />
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Referencias */}
          {adqData.integracionReferencias && (
            <Card className="border-2 border-gray-200 shadow-md">
              <CardContent className="p-6">
                <SeccionReferencias referencias={adqData.integracionReferencias} />
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    // Comité Técnico tiene texto introductorio e invitados permanentes
    if (comiteId === 'tecnico') {
      const tecnicoData = comiteData as typeof comiteTecnicoData;
      
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Texto introductorio */}
              {tecnicoData.integracionIntro && (
                <p className="text-gray-700 leading-relaxed">
                  <TextoConReferencias 
                    texto={tecnicoData.integracionIntro.texto} 
                    referencias={tecnicoData.integracionIntro.referencias} 
                  />
                </p>
              )}

              {/* Tabla principal de integración */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Cargo</th>
                      <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Nombre</th>
                      <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Puesto</th>
                      <th className="bg-[#b5c4c9] text-white border border-gray-300 px-4 py-2 text-center">Cargo</th>
                      <th className="bg-[#b5c4c9] text-white border border-gray-300 px-4 py-2 text-center">Nombre</th>
                      <th className="bg-[#b5c4c9] text-white border border-gray-300 px-4 py-2 text-center">Puesto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {integrantes.map((integrante: any, idx) => {
                      // Determinar si es un encabezado de secretaría
                      const esEncabezado = integrante.nombre === '' && integrante.puesto === '' && !integrante.cargo.includes('Suplente');
                      
                      if (esEncabezado) {
                        return (
                          <tr key={idx} className="bg-gray-100 font-semibold">
                            <td colSpan={6} className="border border-gray-300 px-4 py-2">
                              {integrante.cargo}
                            </td>
                          </tr>
                        );
                      }
                      
                      // Saltar filas que sean suplentes sueltos (se renderizarán con su titular)
                      if (integrante.cargo === 'Suplente') {
                        return null;
                      }
                      
                      // Buscar si el siguiente es su suplente
                      let suplente = null;
                      if (idx + 1 < integrantes.length && integrantes[idx + 1].cargo === 'Suplente') {
                        suplente = integrantes[idx + 1];
                      } else if (integrante.suplente) {
                        suplente = integrante.suplente;
                      }
                      
                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium">{integrante.cargo}</td>
                          <td className="border border-gray-300 px-4 py-2">{integrante.nombre || '-'}</td>
                          <td className="border border-gray-300 px-4 py-2">{integrante.puesto}</td>
                          <td className="border border-gray-300 px-4 py-2 font-medium">
                            {suplente ? (suplente.cargo || `Suplente del ${integrante.cargo}`) : `Suplente del ${integrante.cargo}`}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {suplente ? (suplente.nombre || '-') : '-'}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {suplente ? suplente.puesto : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Invitados Permanentes */}
          {tecnicoData.invitadosPermanentes && (
            <Card className="border-2 border-gray-200 shadow-md">
              <CardContent className="p-6">
                <h3 className="mb-4 font-bold">Invitados Permanentes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Cargo</th>
                        <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Nombre</th>
                        <th className="bg-[#95acb2] text-white border border-gray-300 px-4 py-2 text-center">Puesto</th>
                        <th className="bg-[#b5c4c9] text-white border border-gray-300 px-4 py-2 text-center">Cargo</th>
                        <th className="bg-[#b5c4c9] text-white border border-gray-300 px-4 py-2 text-center">Nombre</th>
                        <th className="bg-[#b5c4c9] text-white border border-gray-300 px-4 py-2 text-center">Puesto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tecnicoData.invitadosPermanentes.map((invitado: any, idx: number) => {
                        // Determinar si es un encabezado
                        const esEncabezado = invitado.nombre === '' && invitado.puesto === '' && !invitado.cargo.includes('Suplente');
                        
                        if (esEncabezado) {
                          return (
                            <tr key={idx} className="bg-gray-100 font-semibold">
                              <td colSpan={6} className="border border-gray-300 px-4 py-2 font-bold">
                                {invitado.cargo}
                              </td>
                            </tr>
                          );
                        }
                        
                        // Saltar filas que sean suplentes sueltos
                        if (invitado.cargo === 'Suplente') {
                          return null;
                        }
                        
                        // Buscar si el siguiente es su suplente
                        let suplente = null;
                        if (idx + 1 < tecnicoData.invitadosPermanentes.length && 
                            tecnicoData.invitadosPermanentes[idx + 1].cargo === 'Suplente') {
                          suplente = tecnicoData.invitadosPermanentes[idx + 1];
                        } else if (invitado.suplente) {
                          suplente = invitado.suplente;
                        }
                        
                        return (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 font-medium">{invitado.cargo}</td>
                            <td className="border border-gray-300 px-4 py-2">{invitado.nombre || '-'}</td>
                            <td className="border border-gray-300 px-4 py-2">{invitado.puesto}</td>
                            <td className="border border-gray-300 px-4 py-2 font-medium">
                              {suplente ? (suplente.cargo || `Suplente del ${invitado.cargo}`) : `Suplente del ${invitado.cargo}`}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {suplente ? (suplente.nombre || '-') : '-'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {suplente ? suplente.puesto : '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    // Verificar si hay secciones (como Invitados Permanentes en Auditoría)
    const tieneSecciones = integrantes.some(i => i.seccion);

    if (tieneSecciones) {
      // Agrupar por sección
      const seccionesMap = new Map<string, Integrante[]>();
      
      integrantes.forEach(integrante => {
        const seccion = integrante.seccion || 'Integrantes';
        if (!seccionesMap.has(seccion)) {
          seccionesMap.set(seccion, []);
        }
        seccionesMap.get(seccion)!.push(integrante);
      });

      return (
        <div className="space-y-6">
          {/* Contenido normativo dentro de Card (SOLO si existe) */}
          {(tieneTextoIntroductorio && integracionData.contenidoNormativo) && (
            <Card className="border-2 border-gray-200 shadow-md">
              <CardContent className="p-6 space-y-4">
                {integracionData.contenidoNormativo.map((parrafo: any, idx: number) => {
                  return (
                    <p key={idx} className="text-gray-700 leading-relaxed text-justify">
                      {parrafo.partes.map((parte: any, pIdx: number) => (
                        <React.Fragment key={pIdx}>
                          <TextoConReferencias 
                            texto={parte.texto} 
                            referencias={parte.referencias} 
                          />
                        </React.Fragment>
                      ))}
                    </p>
                  );
                })}
              </CardContent>
            </Card>
          )}
          
          {Array.from(seccionesMap.entries()).map(([seccion, miembros]) => (
            <Card key={seccion} className="border-2 border-gray-200 shadow-md">
              <CardContent className="p-6">
                {/* Texto introductorio DENTRO del Card de Integrantes */}
                {seccion === 'Integrantes' && tieneTextoIntroductorio && integracionData.textoIntroductorio && (
                  <p className="text-gray-700 leading-relaxed font-medium mb-4">
                    {integracionData.textoIntroductorio}
                  </p>
                )}
                
                {seccion !== 'Integrantes' && (
                  <h3 className="mb-4 font-bold">{seccion}</h3>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#95acb2] text-white">
                        <th className="border border-gray-300 px-4 py-2 text-center">Cargo</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Puesto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {miembros.map((integrante, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium">{integrante.cargo}</td>
                          <td className="border border-gray-300 px-4 py-2">{integrante.nombre || '-'}</td>
                          <td className="border border-gray-300 px-4 py-2">{integrante.puesto}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Referencias dentro de Card - AL FINAL DE TODO */}
          {tieneTextoIntroductorio && integracionData.referencias && integracionData.referencias.length > 0 && (
            <Card className="border-2 border-gray-200 shadow-md">
              <CardContent className="p-6">
                <SeccionReferencias referencias={integracionData.referencias} />
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    // Tabla simple sin secciones
    return (
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#95acb2] text-white">
                  <th className="border border-gray-300 px-4 py-2 text-center">Cargo</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Puesto</th>
                </tr>
              </thead>
              <tbody>
                {integrantes.map((integrante, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">{integrante.cargo}</td>
                    <td className="border border-gray-300 px-4 py-2">{integrante.nombre || '-'}</td>
                    <td className="border border-gray-300 px-4 py-2">{integrante.puesto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Comité de Adquisiciones tiene sección de Invitados */}
          {comiteId === 'adquisiciones' && (comiteData as typeof comiteAdquisicionesData).invitados && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="mb-2"><strong>{(comiteData as typeof comiteAdquisicionesData).invitados.titulo}</strong></p>
              <p className="text-gray-700 leading-relaxed" style={{ fontStyle: 'italic' }}>
                {(comiteData as typeof comiteAdquisicionesData).invitados.texto}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // ===============================================
  // RENDERIZAR ATRIBUCIONES/FUNCIONES
  // ===============================================
  const renderAtribucionesFunciones = () => {
    const esAtribuciones = seccionId === 'atribuciones';
    const data = esAtribuciones 
      ? (comiteData as any).atribuciones 
      : (comiteData as any).funciones;

    if (!data) {
      return <p>Contenido en desarrollo...</p>;
    }

    // Comité T��cnico Atribuciones tiene estructura especial con Artículo 58
    if (comiteId === 'tecnico' && esAtribuciones && data.articulo58) {
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Párrafos introductorios con referencias */}
              {data.parrafosIntroductorios && data.parrafosIntroductorios.map((parrafo: any, idx: number) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  <TextoConReferencias 
                    texto={parrafo.texto} 
                    referencias={parrafo.referencias} 
                  />
                </p>
              ))}

              {/* Artículo 58 en caja azul */}
              <div className="mt-6 p-6 bg-blue-50 rounded-lg">
                <p className="mb-3" style={{ fontStyle: 'italic' }}>
                  <strong>{data.articulo58.titulo}.-</strong> {data.articulo58.subtitulo}
                </p>
                <div className="space-y-3">
                  {data.articulo58.fracciones.map((fraccion: string, idx: number) => (
                    <div key={idx} className="flex gap-3" style={{ fontStyle: 'italic' }}>
                      <span className="flex-shrink-0"><strong>{['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII'][idx]}.</strong></span>
                      <p className="text-gray-700 leading-relaxed">{fraccion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referencias */}
              {data.referencias && (
                <SeccionReferencias referencias={data.referencias} />
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    // Comité de Adquisiciones tiene estructura especial con introducción, artículo y subelementos
    if (comiteId === 'adquisiciones' && !esAtribuciones && data.introduccion) {
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Introducción */}
              <p className="text-gray-700 leading-relaxed">
                {data.introduccion}
              </p>

              {/* Artículo Tercero en caja azul */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="mb-4" style={{ fontStyle: 'italic' }}>
                  <strong>{data.articuloTitulo}</strong>
                </p>
                
                <div className="space-y-4">
                  {data.contenido.map((item: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-gray-700">{item.numero}.</span>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">{item.texto}</p>
                          
                          {/* Subelementos (a, b, c, d, e) */}
                          {item.subelementos && (
                            <div className="mt-3 ml-6 space-y-2">
                              {item.subelementos.map((sub: any, subIdx: number) => (
                                <div key={subIdx} className="flex gap-3">
                                  <span className="flex-shrink-0 font-medium text-gray-700">{sub.letra}.</span>
                                  <p className="text-gray-700 leading-relaxed">{sub.texto}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nota final */}
              {data.notaFinal && (
                <p className="text-gray-700 leading-relaxed mt-6">
                  {data.notaFinal}
                </p>
              )}

              {/* Fuentes/Referencias */}
              {data.fuentes && (
                <SeccionReferencias referencias={data.fuentes} />
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    // Funciones del Comité de Auditoría - Patrón complejo con múltiples artículos y fracciones
    if (comiteId === 'auditoria' && seccionId === 'funciones' && data.articulosLegales) {
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Introducción con referencias */}
              {data.introduccion && (
                <p className="text-gray-700 leading-relaxed">
                  <TextoConReferencias texto={data.introduccion} referencias={data.introReferencias || []} />
                </p>
              )}

              {/* Artículo 161 */}
              {data.articulosLegales && data.articulosLegales.map((art: any, idx: number) => (
                <div key={idx} className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed" style={{ fontStyle: 'italic' }}>
                    <strong style={{ fontStyle: 'italic' }}>{art.titulo}.-</strong> <span style={{ fontStyle: 'italic' }}>{art.contenido}</span>
                  </p>
                  {art.referencias && art.referencias.map((refNum: number) => {
                    const ref = data.fuentes?.find((f: any) => f.numero === refNum);
                    return ref ? (
                      <p key={refNum} className="text-sm text-gray-600 mt-3">
                        <strong>Fuente:</strong> {ref.texto}
                      </p>
                    ) : null;
                  })}
                </div>
              ))}

              {/* Párrafo intermedio */}
              {data.parrafoIntermedio && (
                <p className="text-gray-700 leading-relaxed mt-6">
                  {data.parrafoIntermedio}
                </p>
              )}

              {/* Fracciones I-IV (después del Art. 161) */}
              {data.fracciones && (
                <div className="space-y-4">
                  {data.fracciones.map((frac: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-gray-700">{frac.numero}.</span>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{frac.texto}</p>
                          
                          {/* Subelementos (a, b, etc.) */}
                          {frac.subelementos && (
                            <div className="mt-3 ml-6 space-y-3">
                              {frac.subelementos.map((sub: any, subIdx: number) => (
                                <div key={subIdx}>
                                  <div className="flex gap-3">
                                    <span className="flex-shrink-0 font-medium text-gray-700">{sub.letra}.</span>
                                    <div className="flex-1">
                                      <p className="text-gray-700 leading-relaxed">{sub.texto}</p>
                                      
                                      {/* Sub-numéricos (1, 2, 3, etc.) */}
                                      {sub.subnumericos && (
                                        <div className="mt-2 ml-6 space-y-2">
                                          {sub.subnumericos.map((num: any, numIdx: number) => (
                                            <div key={numIdx} className="flex gap-3">
                                              <span className="flex-shrink-0 text-gray-700">{num.numero}.</span>
                                              <p className="text-gray-700 leading-relaxed">{num.texto}</p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Artículo 162 */}
              {data.articulosLegales2 && data.articulosLegales2.map((art: any, idx: number) => (
                <div key={idx} className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed" style={{ fontStyle: 'italic' }}>
                    <strong style={{ fontStyle: 'italic' }}>{art.titulo}.-</strong> <span style={{ fontStyle: 'italic' }}>{art.contenido}</span>
                  </p>
                </div>
              ))}

              {/* Incisos (i-vi) */}
              {data.incisos && (
                <div className="space-y-3 ml-6">
                  {data.incisos.map((inciso: any, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <span className="flex-shrink-0 font-medium text-gray-700">{inciso.numero}.</span>
                      <p className="text-gray-700 leading-relaxed">{inciso.texto}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Artículo 163 */}
              {data.articulosLegales3 && data.articulosLegales3.map((art: any, idx: number) => (
                <div key={idx} className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed" style={{ fontStyle: 'italic' }}>
                    <strong style={{ fontStyle: 'italic' }}>{art.titulo}.-</strong> <span style={{ fontStyle: 'italic' }}>{art.contenido}</span>
                  </p>
                </div>
              ))}

              {/* Fracciones del 163 (I-XII) */}
              {data.fracciones163 && (
                <div className="space-y-4">
                  {data.fracciones163.map((frac: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 font-bold text-gray-700">{frac.numero}.</span>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{frac.texto}</p>
                          
                          {/* Subelementos (a-g en fracción VI) */}
                          {frac.subelementos && (
                            <div className="mt-3 ml-6 space-y-2">
                              {frac.subelementos.map((sub: any, subIdx: number) => (
                                <div key={subIdx} className="flex gap-3">
                                  <span className="flex-shrink-0 font-medium text-gray-700">{sub.letra}.</span>
                                  <p className="text-gray-700 leading-relaxed">{sub.texto}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Párrafo final del 163 */}
              {data.parrafoFinal163 && (
                <p className="text-gray-700 leading-relaxed mt-6">
                  {data.parrafoFinal163}
                </p>
              )}

              {/* Artículo 164 */}
              {data.articulosLegales4 && data.articulosLegales4.map((art: any, idx: number) => (
                <div key={idx} className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed" style={{ fontStyle: 'italic' }}>
                    <strong style={{ fontStyle: 'italic' }}>{art.titulo}.-</strong> <span style={{ fontStyle: 'italic' }}>{art.contenido}</span>
                  </p>
                </div>
              ))}

              {/* Referencias al final */}
              {data.fuentes && (
                <SeccionReferencias referencias={data.fuentes} />
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    // Comités con artículos numerados romanos
    if (data.articulos && Array.isArray(data.articulos)) {
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6">
              {data.titulo && <h2 className="mb-2">{data.titulo}</h2>}
              {data.subtitulo && <p className="mb-6 text-gray-600">{data.subtitulo}</p>}
              
              <div className="space-y-4">
                {data.articulos.map((art: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <span className="font-bold text-gray-700 flex-shrink-0">{art.numero}.</span>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {art.texto || art.contenido}
                    </p>
                  </div>
                ))}
              </div>

              {data.referencias && (
                <SeccionReferencias referencias={data.referencias} />
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    // Contenido con lista numerada romana simple (formato anterior)
    if (data.contenido && Array.isArray(data.contenido) && data.contenido[0]?.numero) {
      return (
        <div className="space-y-6">
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                {data.contenido.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <span className="font-bold text-gray-700 flex-shrink-0">{item.numero}.</span>
                    <p className="text-gray-700 leading-relaxed">{item.texto}</p>
                  </div>
                ))}
              </div>

              {data.fuentes && (
                <SeccionReferencias referencias={data.fuentes} />
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    // Contenido simple
    return (
      <div className="space-y-6">
        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            {data.titulo && <h2 className="mb-4">{data.titulo}</h2>}
            {typeof data.contenido === 'string' && (
              <p className="text-gray-700 leading-relaxed">{data.contenido}</p>
            )}
            {Array.isArray(data.contenido) && typeof data.contenido[0] === 'string' && (
              <div className="space-y-2">
                {data.contenido.map((item: string, idx: number) => (
                  <p key={idx} className="text-gray-700 leading-relaxed">{item}</p>
                ))}
              </div>
            )}
            {data.fuentes && (
              <SeccionReferencias referencias={data.fuentes} />
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // ===============================================
  // RENDERIZAR SESIONES
  // ===============================================
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
          onRegresar={() => setVistaActiva('tabla')}
        />
      );
    }

    const sesiones = comiteData.sesiones as SesionData[];
    const config = comiteData.configuracion;
    const sesionesIntro = (comiteData as any).sesionesIntro;

    const columns: DataTableColumn<SesionData>[] = [
      { key: 'numeroSesion', label: 'Sesión No.', className: 'text-center' },
      { key: 'nombreSesion', label: 'Sesión' },
      { key: 'tipoSesion', label: 'T. Sesión', className: 'text-center' },
      { key: 'fecha', label: 'Fecha', className: 'text-center whitespace-nowrap', render: (value) => formatFechaStr(value as string) },
      { 
        key: 'acta', 
        label: 'Acta', 
        render: (value) => (
          <div className="flex items-center gap-2">
            <span className="text-sm">{value}</span>
            <button 
              className="text-blue-600 hover:text-blue-700 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                console.log('Ver acta');
              }}
              aria-label="Ver acta"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        ) 
      },
      { 
        key: 'carpeta', 
        label: 'Carpeta',
        render: (value, row) => (
          <div className="flex items-center gap-2">
            <span className="text-sm">{row.tieneCarpeta ? value : 'Sesión sin carpeta'}</span>
            {row.tieneCarpeta && (
              <button 
                className="text-blue-600 hover:text-blue-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Ver carpeta');
                }}
                aria-label="Ver carpeta"
              >
                <FolderOpen className="w-4 h-4" />
              </button>
            )}
          </div>
        ) 
      },
      { 
        key: 'anexos', 
        label: 'Anexos',
        className: 'text-center',
        render: (_, row) => row.anexos === undefined ? 'No' : (row.anexos ? 'Sí' : 'No')
      },
      {
        key: 'actualizar',
        label: 'Actualizar',
        className: 'text-center',
        render: (_, row) => (
          <button
            className="text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center justify-center p-1 hover:bg-blue-50 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setSesionSeleccionada(row);
              setModificarDialogOpen(true);
            }}
            aria-label="Actualizar sesión"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        )
      },
    ];

    const actions: DataTableAction<SesionData>[] = [];

    return (
      <div className="space-y-6">
        {/* Texto introductorio */}
        {sesionesIntro && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#4A90E2] p-6 rounded-lg shadow-sm">
            {sesionesIntro.parrafos && sesionesIntro.parrafos.map((parrafo: any, idx: number) => (
              <p key={idx} className="text-gray-700 leading-relaxed text-justify">
                <TextoConReferencias 
                  texto={parrafo.texto} 
                  referencias={parrafo.referencias} 
                />
              </p>
            ))}

            {sesionesIntro.tipos && (
              <div className="mt-4 space-y-2">
                {sesionesIntro.tipos.map((tipo: any, idx: number) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-medium flex-shrink-0">{tipo.numero}.-</span>
                    <p className="text-gray-700 leading-relaxed">{tipo.texto}</p>
                  </div>
                ))}
              </div>
            )}

            {sesionesIntro.articulo153 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontStyle: 'italic' }}>
                  {sesionesIntro.articulo153.contenido}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-4">
          <Button onClick={() => setVistaActiva('registro')} className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8]">
            Registro de Sesiones
          </Button>
          {config.tieneGeneradorReportes && onNavigateToReportes && (
            <Button
              onClick={() => {
                // Obtener el ID numérico del comité
                const comiteIdMap: Record<ComiteId, number> = {
                  tecnico: 1,
                  adquisiciones: 2,
                  auditoria: 3,
                  calidad: 4,
                };
                onNavigateToReportes({
                  comiteId: comiteIdMap[comiteId],
                  tipoSesiones: true,
                  tipoAcuerdos: false,
                  tipoDocumentos: false,
                });
              }}
              className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8]"
            >
              Generar Reporte
            </Button>
          )}
        </div>

        {/* Tabla */}
        <DataTable
          data={sesiones}
          columns={columns}
          actions={actions}
          searchable
          itemsPerPage={config.paginacionSesiones || 10}
        />

        {/* Dialogo de Modificación */}
        {modificarDialogOpen && sesionSeleccionada && (
          <ModificarSesionDialog
            sesion={sesionSeleccionada}
            comiteNombre={comiteNombre}
            open={modificarDialogOpen}
            onOpenChange={setModificarDialogOpen}
          />
        )}

        {/* Fuentes Documentales - Al final, debajo de la paginación */}
        {sesionesIntro && sesionesIntro.referencias && (
          <SeccionReferencias referencias={sesionesIntro.referencias} />
        )}
      </div>
    );
  };

  // ===============================================
  // RENDERIZAR ACUERDOS
  // ===============================================
  const renderAcuerdos = () => {
    // Comité de Calidad NO tiene acuerdos
    if (comiteId === 'calidad') {
      return <p className="text-gray-600">Este comité no tiene sección de acuerdos.</p>;
    }

    if (vistaActiva === 'registro') {
      return (
        <RegistroAcuerdosForm
          comiteNombre={comiteNombre}
          onRegresar={() => setVistaActiva('tabla')}
        />
      );
    }

    if (vistaActiva === 'reportes') {
      return (
        <GeneradorReportesAcuerdos
          comiteNombre={comiteNombre}
          comiteId={comiteId}
          onRegresar={() => setVistaActiva('tabla')}
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
    const config = comiteData.configuracion;

    const columns: DataTableColumn<AcuerdoData>[] = [
      { key: 'numeroSesion', label: 'Sesión No.', className: 'text-center' },
      { key: 'nombreSesion', label: 'Sesión' },
      { key: 'tipoSesion', label: 'T. Sesión', className: 'text-center' },
      { key: 'fecha', label: 'Fecha', className: 'text-center whitespace-nowrap', render: (value) => formatFechaStr(value as string) },
      { key: 'resolucion', label: 'Resolución / Acuerdo' },
      { key: 'tema', label: 'Tema' },
      { key: 'acuerdo', label: 'Acuerdo' },
      { key: 'estatus', label: 'Estatus', className: 'text-center' },
      {
        key: 'actualizar',
        label: 'Actualizar',
        className: 'text-center',
        render: (_, row) => (
          <button
            className="text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center justify-center p-1 hover:bg-blue-50 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setAcuerdoSeleccionado(row);
              setModificarAcuerdoDialogOpen(true);
            }}
            aria-label="Actualizar acuerdo"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        )
      },
    ];

    const actions: DataTableAction<AcuerdoData>[] = [];

    return (
      <div className="space-y-6">
        {/* Botones */}
        <div className="flex gap-4">
          <Button onClick={() => setVistaActiva('registro')} className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8]">
            Registro de Acuerdos
          </Button>
          {onNavigateToReportes && (
            <Button
              onClick={() => {
                // Obtener el ID numérico del comité
                const comiteIdMap: Record<ComiteId, number> = {
                  tecnico: 1,
                  adquisiciones: 2,
                  auditoria: 3,
                  calidad: 4,
                };
                onNavigateToReportes({
                  comiteId: comiteIdMap[comiteId],
                  tipoSesiones: false,
                  tipoAcuerdos: true,
                  tipoDocumentos: false,
                });
              }}
              className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8]"
            >
              Generar Reporte
            </Button>
          )}
        </div>

        {/* Tabla */}
        <DataTable
          data={acuerdos}
          columns={columns}
          actions={actions}
          searchable
          itemsPerPage={config.paginacionAcuerdos || 10}
        />

        {/* Dialogo de Modificación */}
        {modificarAcuerdoDialogOpen && acuerdoSeleccionado && (
          <ModificarAcuerdoDialog
            acuerdo={acuerdoSeleccionado}
            comiteNombre={comiteNombre}
            open={modificarAcuerdoDialogOpen}
            onOpenChange={setModificarAcuerdoDialogOpen}
          />
        )}
      </div>
    );
  };

  // ===============================================
  // RENDERIZAR CONTENIDO PRINCIPAL
  // ===============================================
  const renderContenido = () => {
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
        return <p className="text-gray-600">Sección en desarrollo...</p>;
    }
  };

  return <div className="space-y-6">{renderContenido()}</div>;
}