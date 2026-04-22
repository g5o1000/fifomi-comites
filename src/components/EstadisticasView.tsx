import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';
import { EstadisticasGeneral } from './estadisticas/EstadisticasGeneral';
import { EstadisticasComite } from './comites/EstadisticasComite';
import { COMITES } from '../types/routes';
import type { ComiteId } from '../types/routes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface EstadisticasViewProps {
  onBack: () => void;
  comiteInicial?: ComiteId;
}

export function EstadisticasView({ onBack, comiteInicial }: EstadisticasViewProps) {
  // Si viene de un comité específico, abrir en tab "Por Comité"
  const [tabActivo, setTabActivo] = useState<'general' | 'comite'>(
    comiteInicial ? 'comite' : 'general'
  );
  const [comiteSeleccionado, setComiteSeleccionado] = useState<ComiteId>(
    comiteInicial || 'tecnico'
  );

  // Obtener nombre del comité seleccionado
  const comiteData = COMITES.find((c) => c.id === comiteSeleccionado);
  const comiteNombre = comiteData?.nombre || 'Comité Técnico';

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header con navegación */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Estadísticas</h1>
          <p className="text-sm text-gray-600">
            Análisis visual y métricas del sistema de comités FIFOMI
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Regresar
        </Button>
      </div>

      {/* Tabs de navegación */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setTabActivo('general')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tabActivo === 'general'
                ? 'border-[#08546C] text-[#08546C]'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Vista General
          </button>
          <button
            onClick={() => setTabActivo('comite')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tabActivo === 'comite'
                ? 'border-[#08546C] text-[#08546C]'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Por Comité
          </button>
        </div>
      </div>

      {/* Contenido según tab activo */}
      {tabActivo === 'general' ? (
        <EstadisticasGeneral />
      ) : (
        <div className="space-y-4">
          {/* Selector de comité */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Seleccionar Comité:
            </label>
            <Select value={comiteSeleccionado} onValueChange={(value) => setComiteSeleccionado(value as ComiteId)}>
              <SelectTrigger className="max-w-md bg-white">
                <SelectValue placeholder="Seleccione un comité" />
              </SelectTrigger>
              <SelectContent>
                {COMITES.map((comite) => (
                  <SelectItem key={comite.id} value={comite.id}>
                    {comite.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Componente de estadísticas reutilizado */}
          <EstadisticasComite
            comiteNombre={comiteNombre}
            onBack={() => setTabActivo('general')}
          />
        </div>
      )}
    </div>
  );
}