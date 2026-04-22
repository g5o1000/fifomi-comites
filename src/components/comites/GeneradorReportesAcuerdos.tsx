import React, { useState } from 'react';
import { FileText, ChevronLeft, BarChart3, Search as SearchIcon, FileCheck, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import type { ComiteId } from '../../types/routes';

interface GeneradorReportesAcuerdosProps {
  comiteNombre: string;
  comiteId?: ComiteId;
  sesiones?: Array<{ id: string; nombre: string }>;
  onRegresar?: () => void;
  onBack?: () => void;
  className?: string;
}

export function GeneradorReportesAcuerdos({
  comiteNombre,
  comiteId,
  sesiones = [],
  onRegresar,
  onBack,
  className,
}: GeneradorReportesAcuerdosProps) {
  const handleBack = onRegresar || onBack;
  
  // Comité de Auditoría tiene descripciones detalladas
  const tieneDescripciones = comiteId === 'auditoria';

  // Estados para cada tipo de reporte
  const [sesionSeleccionada, setSesionSeleccionada] = useState<string>('todas');
  const [estatusSeleccionado, setEstatusSeleccionado] = useState<string>('todos');
  const [sesionParaEstatus, setSesionParaEstatus] = useState<string>('todas');
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  const [sesionConsolidada, setSesionConsolidada] = useState<string>('todas');
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<string>('todos');

  // Generar lista de años (ejercicios) desde 2014 hasta el año actual
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 + 1 },
    (_, i) => currentYear - i
  );

  const estatusOptions = [
    'Todos',
    'Aprobado',
    'Autorizado',
    'En Proceso',
    'Pendiente',
    'Rechazado',
  ];

  const handleGenerarReporte = (tipoReporte: string) => {
    console.log(`Generando reporte: ${tipoReporte}`);
    // Aquí iría la lógica para generar cada tipo de reporte
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2 font-bold">
            Reportes de {comiteNombre}
          </h2>
          <p className="text-sm text-gray-600">
            Generador de reportes de acuerdos
          </p>
        </div>
        {handleBack && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Regresar
          </Button>
        )}
      </div>

      {/* 1. Reporte Por Sesión */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 mb-1">
                  Por Sesión
                </h3>
                <p className="text-sm text-gray-600">
                  Genera un informe de los acuerdos del Comité tomados durante la sesión solicitada o de todas las sesiones hasta la fecha.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="text-sm text-gray-700 min-w-fit">
                  Selecciona la Sesión:
                </label>
                <Select value={sesionSeleccionada} onValueChange={setSesionSeleccionada}>
                  <SelectTrigger className="w-full sm:w-64 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todas-sesiones-1" value="todas">Todas las Sesiones</SelectItem>
                    {sesiones.map((sesion) => (
                      <SelectItem key={sesion.id} value={sesion.id}>
                        {sesion.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => handleGenerarReporte('por-sesion')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#08546C] to-[#022534] hover:from-[#06445a] hover:to-[#011a24] text-white gap-2"
              >
                Generar Reporte »
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Reporte Por Estatus */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 mb-1">
                  Por Estatus
                </h3>
                <p className="text-sm text-gray-600">
                  Genera un informe del Estatus de los acuerdos del Comité, desde una sesión o de todas las sesiones hasta la fecha
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="text-sm text-gray-700 min-w-fit">
                  Selecciona el Estatus:
                </label>
                <Select value={estatusSeleccionado} onValueChange={setEstatusSeleccionado}>
                  <SelectTrigger className="w-full sm:w-48 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {estatusOptions.map((estatus) => (
                      <SelectItem key={estatus} value={estatus.toLowerCase()}>
                        {estatus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="text-sm text-gray-700 min-w-fit">
                  Selecciona la Sesión:
                </label>
                <Select value={sesionParaEstatus} onValueChange={setSesionParaEstatus}>
                  <SelectTrigger className="w-full sm:w-64 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todas-sesiones-2" value="todas">Todas las Sesiones</SelectItem>
                    {sesiones.map((sesion) => (
                      <SelectItem key={sesion.id} value={sesion.id}>
                        {sesion.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => handleGenerarReporte('por-estatus')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#08546C] to-[#022534] hover:from-[#06445a] hover:to-[#011a24] text-white gap-2"
              >
                Generar Reporte »
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Reporte Tema & Acuerdo */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <SearchIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 mb-1">
                  Tema & Acuerdo
                </h3>
                <p className="text-sm text-gray-600">
                  Genera un informe específico del contenido de la información solicitada, se obtiene de los campos de tema y acuerdo:
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">
                  Información / Texto a buscar:
                </label>
                <Input
                  type="text"
                  value={textoBusqueda}
                  onChange={(e) => setTextoBusqueda(e.target.value)}
                  placeholder="Introduce el texto o la frase a buscar en el Tema o Acuerdo"
                  className="bg-white"
                />
              </div>

              <Button
                onClick={() => handleGenerarReporte('tema-acuerdo')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#08546C] to-[#022534] hover:from-[#06445a] hover:to-[#011a24] text-white gap-2"
              >
                Generar Reporte »
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Reporte Consolidado por Sesión */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 mb-1">
                  Consolidado por Sesión
                </h3>
                <p className="text-sm text-gray-600">
                  Genera un Resumen de Acuerdos por Sesión
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="text-sm text-gray-700 min-w-fit">
                  Selecciona la Sesión:
                </label>
                <Select value={sesionConsolidada} onValueChange={setSesionConsolidada}>
                  <SelectTrigger className="w-full sm:w-64 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todas-sesiones-3" value="todas">Todas las Sesiones</SelectItem>
                    {sesiones.map((sesion) => (
                      <SelectItem key={sesion.id} value={sesion.id}>
                        {sesion.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => handleGenerarReporte('consolidado')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#08546C] to-[#022534] hover:from-[#06445a] hover:to-[#011a24] text-white gap-2"
              >
                Generar Reporte »
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Reporte Sesiones & Acuerdos por Ejercicio */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 mb-1">
                  Sesiones & Acuerdos por Ejercicio
                </h3>
                <p className="text-sm text-gray-600">
                  Genera un informe de las sesiones realizadas en el ejercicio y un resumen de los acuerdos de las sesiones del Comité.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="text-sm text-gray-700 min-w-fit">
                  Selecciona el Ejercicio:
                </label>
                <Select value={ejercicioSeleccionado} onValueChange={setEjercicioSeleccionado}>
                  <SelectTrigger className="w-full sm:w-48 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todos-ejercicios" value="todos">Todos</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => handleGenerarReporte('sesiones-acuerdos-ejercicio')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#08546C] to-[#022534] hover:from-[#06445a] hover:to-[#011a24] text-white gap-2"
              >
                Generar Reporte »
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón Regresar inferior */}
      {handleBack && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Regresar
          </Button>
        </div>
      )}
    </div>
  );
}