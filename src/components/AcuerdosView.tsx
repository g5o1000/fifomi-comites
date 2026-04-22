import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuthStore } from '../presentation/shared/store/auth.store';
import { comites, acuerdos as acuerdosIniciales } from '../data/mockData';
import { Acuerdo } from '../types';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FileCheck,
  Calendar,
  User,
  Filter,
} from 'lucide-react';

export function AcuerdosView() {
  const usuario = useAuthStore((state) => state.user);
  const [acuerdos, setAcuerdos] = useState<Acuerdo[]>(acuerdosIniciales);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroComite, setFiltroComite] = useState<string>('todos');
  const [filtroEstatus, setFiltroEstatus] = useState<string>('todos');
  const [selectedAcuerdo, setSelectedAcuerdo] = useState<Acuerdo | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Acuerdo>>({});

  const isAdmin = usuario?.rol === 'admin';

  const acuerdosFiltrados = acuerdos.filter((acuerdo) => {
    const matchSearch =
      acuerdo.descripcion_acuerdo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acuerdo.responsable.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchComite =
      filtroComite === 'todos' || acuerdo.id_comite === parseInt(filtroComite);
    
    const matchEstatus =
      filtroEstatus === 'todos' || acuerdo.estatus === filtroEstatus;

    return matchSearch && matchComite && matchEstatus;
  });

  const handleNuevoAcuerdo = () => {
    setFormData({
      id_comite: comites[0].id_comite,
      numero_sesion: 1,
      fecha_sesion: new Date().toISOString().split('T')[0],
      descripcion_acuerdo: '',
      estatus: 'Pendiente',
      responsable: '',
    });
    setSelectedAcuerdo(null);
    setIsFormOpen(true);
  };

  const handleEditarAcuerdo = (acuerdo: Acuerdo) => {
    setFormData(acuerdo);
    setSelectedAcuerdo(acuerdo);
    setIsFormOpen(true);
  };

  const handleGuardarAcuerdo = () => {
    if (selectedAcuerdo) {
      setAcuerdos(
        acuerdos.map((a) =>
          a.id_acuerdo === selectedAcuerdo.id_acuerdo ? { ...a, ...formData } as Acuerdo : a
        )
      );
    } else {
      const nuevoAcuerdo: Acuerdo = {
        id_acuerdo: Math.max(...acuerdos.map((a) => a.id_acuerdo)) + 1,
        id_comite: formData.id_comite || comites[0].id_comite,
        numero_sesion: formData.numero_sesion || 1,
        fecha_sesion: formData.fecha_sesion || new Date().toISOString().split('T')[0],
        descripcion_acuerdo: formData.descripcion_acuerdo || '',
        estatus: formData.estatus || 'Pendiente',
        responsable: formData.responsable || '',
        fecha_limite: formData.fecha_limite,
      };
      setAcuerdos([...acuerdos, nuevoAcuerdo]);
    }
    setIsFormOpen(false);
    setFormData({});
  };

  const handleEliminarAcuerdo = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este acuerdo?')) {
      setAcuerdos(acuerdos.filter((a) => a.id_acuerdo !== id));
    }
  };

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
      month: 'short',
      day: 'numeric',
    });
  };

  const estatusOptions = ['Pendiente', 'En Proceso', 'Completado', 'Cancelado'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">Gestión de Acuerdos</h1>
          <p className="text-gray-600">
            Seguimiento de acuerdos por sesión de comité
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleNuevoAcuerdo}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Acuerdo
          </Button>
        )}
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar acuerdos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filtroComite} onValueChange={setFiltroComite}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por comité" />
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

            <Select value={filtroEstatus} onValueChange={setFiltroEstatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estatus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="todos-estatus" value="todos">Todos los estatus</SelectItem>
                {estatusOptions.map((estatus) => (
                  <SelectItem key={estatus} value={estatus}>
                    {estatus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="text-sm text-gray-600">
        Mostrando {acuerdosFiltrados.length} de {acuerdos.length} acuerdos
      </div>

      {/* Lista de Acuerdos */}
      <div className="space-y-4">
        {acuerdosFiltrados.map((acuerdo) => {
          const comite = comites.find((c) => c.id_comite === acuerdo.id_comite);
          return (
            <Card key={acuerdo.id_acuerdo} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-2">
                          {acuerdo.descripcion_acuerdo}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FileCheck className="w-4 h-4" />
                            {comite?.nombre_comite}
                          </span>
                          <span>•</span>
                          <span>Sesión {acuerdo.numero_sesion}</span>
                        </div>
                      </div>
                      <Badge className={getEstatusColor(acuerdo.estatus)} variant="outline">
                        {acuerdo.estatus}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Fecha Sesión</span>
                        </div>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatFecha(acuerdo.fecha_sesion)}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>Responsable</span>
                        </div>
                        <p className="text-sm text-gray-900 mt-1">
                          {acuerdo.responsable}
                        </p>
                      </div>

                      {acuerdo.fecha_limite && (
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Fecha Límite</span>
                          </div>
                          <p className="text-sm text-gray-900 mt-1">
                            {formatFecha(acuerdo.fecha_limite)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  {isAdmin && (
                    <div className="flex lg:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditarAcuerdo(acuerdo)}
                      >
                        <Edit className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline">Editar</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEliminarAcuerdo(acuerdo.id_acuerdo)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline">Eliminar</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {acuerdosFiltrados.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron acuerdos</p>
          </CardContent>
        </Card>
      )}

      {/* Dialog para Formulario */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAcuerdo ? 'Editar Acuerdo' : 'Nuevo Acuerdo'}
            </DialogTitle>
            <DialogDescription>
              {selectedAcuerdo ? 'Edita los detalles del acuerdo seleccionado.' : 'Crea un nuevo acuerdo.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="comite">Comité</Label>
                <Select
                  value={formData.id_comite?.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, id_comite: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar comité" />
                  </SelectTrigger>
                  <SelectContent>
                    {comites.map((comite) => (
                      <SelectItem key={comite.id_comite} value={comite.id_comite.toString()}>
                        {comite.nombre_comite}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sesion">Número de Sesión</Label>
                <Input
                  id="sesion"
                  type="number"
                  min="1"
                  value={formData.numero_sesion || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, numero_sesion: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción del Acuerdo</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion_acuerdo || ''}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion_acuerdo: e.target.value })
                }
                placeholder="Descripción detallada del acuerdo..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fecha_sesion">Fecha de Sesión</Label>
                <Input
                  id="fecha_sesion"
                  type="date"
                  value={formData.fecha_sesion || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha_sesion: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="fecha_limite">Fecha Límite (Opcional)</Label>
                <Input
                  id="fecha_limite"
                  type="date"
                  value={formData.fecha_limite || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, fecha_limite: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="responsable">Responsable</Label>
                <Input
                  id="responsable"
                  value={formData.responsable || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, responsable: e.target.value })
                  }
                  placeholder="Nombre del responsable"
                />
              </div>

              <div>
                <Label htmlFor="estatus">Estatus</Label>
                <Select
                  value={formData.estatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, estatus: value as Acuerdo['estatus'] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estatus" />
                  </SelectTrigger>
                  <SelectContent>
                    {estatusOptions.map((estatus) => (
                      <SelectItem key={estatus} value={estatus}>
                        {estatus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleGuardarAcuerdo} className="flex-1">
                Guardar
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}