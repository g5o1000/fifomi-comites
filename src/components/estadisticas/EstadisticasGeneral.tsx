import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
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

export function EstadisticasGeneral() {
  // Datos comparativos por comité (memoizados para evitar recreación)
  const datosPorComite = React.useMemo(() => [
    {
      id: 'tecnico',
      comite: 'Técnico',
      pendientes: 115,
      enProceso: 34,
      aprobados: 122,
      total: 271,
    },
    {
      id: 'adquisiciones',
      comite: 'Adquisiciones',
      pendientes: 45,
      enProceso: 23,
      aprobados: 89,
      total: 157,
    },
    {
      id: 'auditoria',
      comite: 'Auditoría',
      pendientes: 12,
      enProceso: 8,
      aprobados: 67,
      total: 87,
    },
    {
      id: 'calidad',
      comite: 'Calidad',
      pendientes: 8,
      enProceso: 5,
      aprobados: 42,
      total: 55,
    },
  ], []);

  // Datos de distribución total (memoizados)
  const distribucionTotal = React.useMemo(() => [
    { id: 'aprobados', name: 'Aprobados', value: 320, color: '#10b981' },
    { id: 'autorizados', name: 'Autorizados', value: 89, color: '#3b82f6' },
    { id: 'proceso', name: 'En Proceso', value: 70, color: '#f59e0b' },
    { id: 'pendientes', name: 'Pendientes', value: 180, color: '#ef4444' },
  ], []);

  // Datos por ejercicio (memoizados)
  const datosPorEjercicio = React.useMemo(() => [
    { id: '2019', ejercicio: '2019', acuerdos: 145, sesiones: 42 },
    { id: '2020', ejercicio: '2020', acuerdos: 162, sesiones: 48 },
    { id: '2021', ejercicio: '2021', acuerdos: 138, sesiones: 38 },
    { id: '2022', ejercicio: '2022', acuerdos: 181, sesiones: 52 },
    { id: '2023', ejercicio: '2023', acuerdos: 157, sesiones: 46 },
    { id: '2024', ejercicio: '2024', acuerdos: 98, sesiones: 28 },
  ], []);

  // Calcular métricas globales
  const totalAcuerdos = datosPorComite.reduce((sum, c) => sum + c.total, 0);
  const totalPendientes = datosPorComite.reduce((sum, c) => sum + c.pendientes, 0);
  const totalEnProceso = datosPorComite.reduce((sum, c) => sum + c.enProceso, 0);
  const totalAprobados = datosPorComite.reduce((sum, c) => sum + c.aprobados, 0);
  const tasaCumplimiento = Math.round((totalAprobados / totalAcuerdos) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2 font-bold">
          Estadísticas Generales
        </h2>
        <p className="text-sm text-gray-600">
          Vista comparativa de todos los comités FIFOMI
        </p>
      </div>

      {/* Tarjetas de resumen global */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Acuerdos</p>
                <p className="text-3xl text-gray-900">{totalAcuerdos}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#08546C] to-[#022534] rounded-lg text-white">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>4 Comités Activos</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasa de Cumplimiento</p>
                <p className="text-3xl text-gray-900">{tasaCumplimiento}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-lg text-white">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {totalAprobados} de {totalAcuerdos} aprobados
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">En Proceso</p>
                <p className="text-3xl text-gray-900">{totalEnProceso}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-lg text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {Math.round((totalEnProceso / totalAcuerdos) * 100)}% del total
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                <p className="text-3xl text-gray-900">{totalPendientes}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#ef4444] to-[#dc2626] rounded-lg text-white">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {Math.round((totalPendientes / totalAcuerdos) * 100)}% del total
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfica comparativa por comité */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#08546C] to-[#022534] text-white flex items-center py-4">
          <h3 className="text-lg font-medium">Acuerdos por Comité y Estatus</h3>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={datosPorComite} id="general-comites" accessibilityLayer={false}>
              <CartesianGrid key="grid" strokeDasharray="3 3" />
              <XAxis key="xaxis" dataKey="comite" />
              <YAxis key="yaxis" />
              <Tooltip key="tooltip" />
              <Legend key="legend" />
              <Bar key="bar-pendientes" dataKey="pendientes" stackId="a" fill="#ef4444" name="Pendientes" />
              <Bar key="bar-en-proceso" dataKey="enProceso" stackId="a" fill="#f59e0b" name="En Proceso" />
              <Bar key="bar-aprobados" dataKey="aprobados" stackId="a" fill="#10b981" name="Aprobados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Grid de gráficas adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución total por estatus */}
        <Card className="border-2 border-gray-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white flex items-center py-4">
            <h3 className="text-lg font-medium">Distribución por Estatus</h3>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart id="general-distribucion" accessibilityLayer={false}>
                <Pie
                  key="pie"
                  data={distribucionTotal}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distribucionTotal.map((entry) => (
                    <Cell key={`cell-${entry.id}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="tooltip" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tendencia por ejercicio */}
        <Card className="border-2 border-gray-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#7c2539] to-[#5a1a29] text-white flex items-center py-4">
            <h3 className="text-lg font-medium">Tendencia por Ejercicio</h3>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosPorEjercicio} id="general-tendencia" accessibilityLayer={false}>
                <CartesianGrid key="grid" strokeDasharray="3 3" />
                <XAxis key="xaxis" dataKey="ejercicio" />
                <YAxis key="yaxis" />
                <Tooltip key="tooltip" />
                <Legend key="legend" />
                <Bar key="bar-acuerdos" dataKey="acuerdos" fill="#4A90E2" name="Acuerdos" />
                <Bar key="bar-sesiones" dataKey="sesiones" fill="#7c2539" name="Sesiones" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights destacados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium text-blue-900">Comité más activo</p>
                <p className="text-xl text-blue-700 mt-1">Comité Técnico</p>
                <p className="text-xs text-blue-600 mt-1">271 acuerdos totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="text-sm font-medium text-green-900">Mejor cumplimiento</p>
                <p className="text-xl text-green-700 mt-1">Auditoría</p>
                <p className="text-xs text-green-600 mt-1">77% de aprobación</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <p className="text-sm font-medium text-orange-900">Requiere atención</p>
                <p className="text-xl text-orange-700 mt-1">115 pendientes</p>
                <p className="text-xs text-orange-600 mt-1">En Comité Técnico</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}