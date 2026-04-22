import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TextoConReferencias, SeccionReferencias } from './comites/ReferenciasNumeradas';
import { comites, acuerdos, documentos } from '../data/mockData';
import {
  FolderKanban,
  FileCheck,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

interface DashboardProps {
  onNavigateToReportes?: (filtro: 'comites' | 'acuerdos' | 'documentos' | 'cumplimiento' | 'pendientes' | 'proceso' | 'completados') => void;
  onNavigateToComite?: (comiteId: number, section?: string) => void;
}

export function Dashboard({ onNavigateToReportes, onNavigateToComite }: DashboardProps) {
  const estadisticas = useMemo(() => {
    const totalComites = comites.filter((c) => c.activo).length;
    const totalAcuerdos = acuerdos.length;
    const totalDocumentos = documentos.length;

    const acuerdosPendientes = acuerdos.filter((a) => a.estatus === 'Pendiente').length;
    const acuerdosEnProceso = acuerdos.filter((a) => a.estatus === 'En Proceso').length;
    const acuerdosCompletados = acuerdos.filter((a) => a.estatus === 'Completado').length;

    return {
      totalComites,
      totalAcuerdos,
      totalDocumentos,
      acuerdosPendientes,
      acuerdosEnProceso,
      acuerdosCompletados,
    };
  }, []);

  const acuerdosRecientes = useMemo(() => {
    return [...acuerdos]
      .sort((a, b) => new Date(b.fecha_sesion).getTime() - new Date(a.fecha_sesion).getTime())
      .slice(0, 5);
  }, []);

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
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Referencias documentales
  const referencias = [
    { numero: 1, texto: 'Ley Orgánica de la Administración Pública Federal' },
    { numero: 2, texto: 'Ley Federal de las Entidades Paraestatales' },
    { numero: 3, texto: 'Reglamento de la Ley Federal de las Entidades Paraestatales' },
  ];

  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <div>
        <h2 className="text-gray-900 mb-4 font-bold">Resumen General</h2>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div 
          onClick={() => onNavigateToReportes?.('comites')}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#98989A] to-[#7a7a7c] text-white shadow-lg hover:from-[#13322e] hover:to-[#1a4540] transition-all duration-300 cursor-pointer group"
        >
          {/* Círculo decorativo grande */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          {/* Botón de acción circular con flecha */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10 group-hover:bg-white/30 transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-2">{estadisticas.totalComites}</div>
            <p className="text-white text-sm">
              Comités Activos
            </p>
          </div>
        </div>

        <div 
          onClick={() => onNavigateToReportes?.('acuerdos')}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#98989A] to-[#7a7a7c] text-white shadow-lg hover:from-[#13322e] hover:to-[#1a4540] transition-all duration-300 cursor-pointer group"
        >
          {/* Círculo decorativo grande */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          {/* Botón de acción circular con flecha */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10 group-hover:bg-white/30 transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-2">{estadisticas.totalAcuerdos}</div>
            <p className="text-white text-sm">
              Total Acuerdos
            </p>
          </div>
        </div>

        <div 
          onClick={() => onNavigateToReportes?.('documentos')}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#98989A] to-[#7a7a7c] text-white shadow-lg hover:from-[#13322e] hover:to-[#1a4540] transition-all duration-300 cursor-pointer group"
        >
          {/* Círculo decorativo grande */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          {/* Botón de acción circular con flecha */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10 group-hover:bg-white/30 transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-2">{estadisticas.totalDocumentos}</div>
            <p className="text-white text-sm">
              Documentos
            </p>
          </div>
        </div>

        <div 
          onClick={() => onNavigateToReportes?.('cumplimiento')}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#98989A] to-[#7a7a7c] text-white shadow-lg hover:from-[#13322e] hover:to-[#1a4540] transition-all duration-300 cursor-pointer group"
        >
          {/* Círculo decorativo grande */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          {/* Botón de acción circular con flecha */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10 group-hover:bg-white/30 transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-2">
              {Math.round((estadisticas.acuerdosCompletados / estadisticas.totalAcuerdos) * 100)}%
            </div>
            <p className="text-white text-sm">
              Tasa de Cumplimiento
            </p>
          </div>
        </div>
      </div>

      {/* Estatus de Acuerdos */}
      <div className="grid gap-6 md:grid-cols-3">
        <div 
          onClick={() => onNavigateToReportes?.('pendientes')}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#98989A] to-[#7a7a7c] text-white shadow-lg hover:from-[#13322e] hover:to-[#1a4540] transition-all duration-300 cursor-pointer group"
        >
          {/* Círculo decorativo grande */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          {/* Botón de acción circular con flecha */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10 group-hover:bg-white/30 transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-2">{estadisticas.acuerdosPendientes}</div>
            <p className="text-white text-sm">
              Pendientes
            </p>
          </div>
        </div>

        <div 
          onClick={() => onNavigateToReportes?.('proceso')}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#98989A] to-[#7a7a7c] text-white shadow-lg hover:from-[#13322e] hover:to-[#1a4540] transition-all duration-300 cursor-pointer group"
        >
          {/* Círculo decorativo grande */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          {/* Botón de acción circular con flecha */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10 group-hover:bg-white/30 transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-2">{estadisticas.acuerdosEnProceso}</div>
            <p className="text-white text-sm">
              En Proceso
            </p>
          </div>
        </div>

        <div 
          onClick={() => onNavigateToReportes?.('completados')}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#98989A] to-[#7a7a7c] text-white shadow-lg hover:from-[#13322e] hover:to-[#1a4540] transition-all duration-300 cursor-pointer group"
        >
          {/* Círculo decorativo grande */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8 opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          {/* Botón de acción circular con flecha */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10 group-hover:bg-white/30 transition-all">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-2">{estadisticas.acuerdosCompletados}</div>
            <p className="text-white text-sm">
              Completados
            </p>
          </div>
        </div>
      </div>

      {/* Acuerdos Recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Acuerdos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {acuerdosRecientes.map((acuerdo) => {
              const comite = comites.find((c) => c.id_comite === acuerdo.id_comite);
              return (
                <div
                  key={acuerdo.id_acuerdo}
                  onClick={() => onNavigateToComite?.(acuerdo.id_comite, 'acuerdos')}
                  className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0 hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1 group-hover:text-[#7c2539]">
                      {acuerdo.descripcion_acuerdo}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      <span>{comite?.nombre_comite}</span>
                      <span>•</span>
                      <span>Sesión {acuerdo.numero_sesion}</span>
                      <span>•</span>
                      <span>{formatFecha(acuerdo.fecha_sesion)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Responsable: {acuerdo.responsable}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getEstatusColor(acuerdo.estatus)} variant="outline">
                      {acuerdo.estatus}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#7c2539]" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comités Activos */}
      <Card>
        <CardHeader>
          <CardTitle>Comités Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {comites
              .filter((c) => c.activo)
              .map((comite) => {
                const numAcuerdos = acuerdos.filter(
                  (a) => a.id_comite === comite.id_comite
                ).length;
                const numDocumentos = documentos.filter(
                  (d) => d.id_comite === comite.id_comite
                ).length;

                return (
                  <div
                    key={comite.id_comite}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    onClick={() => onNavigateToComite?.(comite.id_comite)}
                  >
                    <h3 className="text-gray-900 mb-2">{comite.nombre_comite}</h3>
                    <p className="text-sm text-gray-600 mb-3">{comite.descripcion}</p>
                    <div className="flex gap-4 text-xs text-gray-600">
                      <span>{numAcuerdos} acuerdos</span>
                      <span>•</span>
                      <span>{numDocumentos} documentos</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Título de Antecedentes */}
      <div>
        <h2 className="text-gray-900 mb-4 font-bold">Antecedentes</h2>
      </div>

      {/* Sección de Antecedentes */}
      <Card className="bg-white border-gray-200">
        <CardContent className="space-y-4 pt-6">
          <p className="text-gray-700 leading-relaxed">
            La constitución de los Comités de apoyo del Órgano de Gobierno (Comité Técnico) del Fideicomiso de Fomento Minero, deriva de la observancia de la Ley Federal de las Entidades Paraestatales y su Reglamento, en los que se establece la posibilidad de delegar en otros órganos colegiados las siguientes funciones:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Apoyar al seguimiento de programas especiales.</li>
            <li>Impulsar procesos de modernización institucional</li>
            <li>Dar seguimiento a observaciones de auditorías internas y externas.</li>
            <li>Las que formulen los comisarios</li>
            <li>Coadyuvar en la soluci��n de asuntos de otra índole, delegados por el propio Órgano de Gobierno.</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            <TextoConReferencias 
              texto="Su organización y atribuciones se establecen en su caso, en los Manuales de Integración y operación que autorice el Comité Técnico, mientras que su funcionamiento se basa en las siguientes disposiciones legales, y demás aplicables:" 
              referencias={[]}
            />
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <TextoConReferencias 
                texto="Ley Orgánica de la Administración Pública Federal" 
                referencias={[1]}
              />
            </li>
            <li>
              <TextoConReferencias 
                texto="Ley Federal de las Entidades Paraestatales" 
                referencias={[2]}
              />
            </li>
            <li>
              <TextoConReferencias 
                texto="Reglamento de la Ley Federal de las Entidades Paraestatales" 
                referencias={[3]}
              />
            </li>
          </ul>

          <SeccionReferencias referencias={referencias} />
        </CardContent>
      </Card>
    </div>
  );
}