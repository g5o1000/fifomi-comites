import React, { useState } from 'react';
import { FileText, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

interface GeneradorReportesSesionesProps {
  comiteNombre: string;
  onRegresar?: () => void;
  onBack?: () => void;
  className?: string;
}

export function GeneradorReportesSesiones({
  comiteNombre,
  onRegresar,
  onBack,
  className,
}: GeneradorReportesSesionesProps) {
  const handleBack = onRegresar || onBack;
  const [ejercicio, setEjercicio] = useState<string>('todos');

  const handleGenerarReporte = () => {
    console.log(`Generando reporte de sesiones para ejercicio: ${ejercicio}`);
    // Aquí iría la lógica para generar el reporte
  };

  // Generar lista de años (ejercicios) desde 2014 hasta el año actual
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 + 1 },
    (_, i) => currentYear - i
  );

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2 font-bold">
            Reportes de {comiteNombre}
          </h2>
          <p className="text-sm text-gray-600">
            Generador de reportes de sesiones
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

      {/* Reporte: Resumen de Sesiones por Ejercicio */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Título del reporte */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 mb-1">
                  Resumen de Sesiones por Ejercicio
                </h3>
                <p className="text-sm text-gray-600">
                  Genera un informe de las sesiones realizadas en el ejercicio.
                </p>
              </div>
            </div>

            {/* Controles */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="text-sm text-gray-700 min-w-fit">
                  Selecciona el Ejercicio:
                </label>
                <Select value={ejercicio} onValueChange={setEjercicio}>
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
                onClick={handleGenerarReporte}
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