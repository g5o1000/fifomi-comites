import React, { useState } from 'react';
import { BarChart3, ChevronLeft, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent, CardHeader } from '../ui/card';
import { cn } from '../../lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface EstadisticasComiteProps {
  comiteNombre: string;
  onBack?: () => void;
  className?: string;
}

export function EstadisticasComite({
  comiteNombre,
  onBack,
  className,
}: EstadisticasComiteProps) {
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<string>('todos');
  const [tipoGrafica, setTipoGrafica] = useState<string>('barras');

  // Generar lista de años desde 2014
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 + 1 },
    (_, i) => currentYear - i
  );

  // Datos de ejemplo para las gráficas
  const dataPorEjercicio = [
    { ejercicio: '2019', acuerdos: 45, sesiones: 12 },
    { ejercicio: '2020', acuerdos: 52, sesiones: 14 },
    { ejercicio: '2021', acuerdos: 38, sesiones: 10 },
    { ejercicio: '2022', acuerdos: 61, sesiones: 16 },
    { ejercicio: '2023', acuerdos: 47, sesiones: 13 },
    { ejercicio: '2024', acuerdos: 28, sesiones: 8 },
  ];

  const dataPorEstatus = [
    { name: 'Aprobado', value: 156, color: '#10b981' },
    { name: 'Autorizado', value: 89, color: '#3b82f6' },
    { name: 'En Proceso', value: 34, color: '#f59e0b' },
    { name: 'Pendiente', value: 21, color: '#ef4444' },
  ];

  const dataPorTipo = [
    { tipo: 'Ordinaria', cantidad: 58 },
    { tipo: 'Extraordinaria', cantidad: 22 },
  ];

  const COLORS = ['#2C2C2C', '#3a4e7a', '#95acb2', '#6b9bb3'];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2 font-bold">
            Estadísticas del {comiteNombre}
          </h2>
          <p className="text-sm text-gray-600">
            Análisis y métricas de acuerdos y sesiones
          </p>
        </div>
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Regresar
          </Button>
        )}
      </div>

      {/* Controles */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-2 block">
                Selecciona el Ejercicio:
              </label>
              <Select value={ejercicioSeleccionado} onValueChange={setEjercicioSeleccionado}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccione ejercicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="todos-ejercicios" value="todos">Todos los ejercicios</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-2 block">
                Tipo de Gráfica:
              </label>
              <Select value={tipoGrafica} onValueChange={setTipoGrafica}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccione tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="barras" value="barras">Gráfica de Barras</SelectItem>
                  <SelectItem key="pastel" value="pastel">Gráfica de Pastel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Acuerdos</p>
                <p className="text-3xl text-gray-900">271</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs año anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Sesiones</p>
                <p className="text-3xl text-gray-900">73</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8% vs año anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Promedio/Sesión</p>
                <p className="text-3xl text-gray-900">3.7</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Acuerdos por sesión</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasa Aprobación</p>
                <p className="text-3xl text-gray-900">91%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Acuerdos aprobados</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfica de Acuerdos y Sesiones por Ejercicio */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#08546C] to-[#022534] text-white">
          <h3 className="text-lg">Acuerdos y Sesiones por Ejercicio</h3>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataPorEjercicio} id={`comite-ejercicio-${comiteNombre.replace(/\s+/g, '-')}`} accessibilityLayer={false}>
              <CartesianGrid key="grid" strokeDasharray="3 3" />
              <XAxis key="xaxis" dataKey="ejercicio" />
              <YAxis key="yaxis" />
              <Tooltip key="tooltip" />
              <Legend key="legend" />
              <Bar key="bar-acuerdos" dataKey="acuerdos" fill="#2C2C2C" name="Acuerdos" />
              <Bar key="bar-sesiones" dataKey="sesiones" fill="#3a4e7a" name="Sesiones" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráficas adicionales en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de Estatus */}
        <Card className="border-2 border-gray-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#08546C] to-[#022534] text-white">
            <h3 className="text-lg">Distribución por Estatus</h3>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart id={`comite-distribucion-${comiteNombre.replace(/\s+/g, '-')}`} accessibilityLayer={false}>
                <Pie
                  key="pie"
                  data={dataPorEstatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataPorEstatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="tooltip" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfica de Tipo de Sesión */}
        <Card className="border-2 border-gray-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#08546C] to-[#022534] text-white">
            <h3 className="text-lg">Sesiones por Tipo</h3>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataPorTipo} id={`comite-tipo-${comiteNombre.replace(/\s+/g, '-')}`} layout="vertical" accessibilityLayer={false}>
                <CartesianGrid key="grid" strokeDasharray="3 3" />
                <XAxis key="xaxis" type="number" />
                <YAxis key="yaxis" dataKey="tipo" type="category" />
                <Tooltip key="tooltip" />
                <Bar key="bar-cantidad" dataKey="cantidad" fill="#2C2C2C" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Botón Regresar inferior */}
      {onBack && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={onBack}
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