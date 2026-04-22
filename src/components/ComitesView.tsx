import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { useAuthStore } from '../presentation/shared/store/auth.store';
import { comites as comitesIniciales, acuerdos, documentos } from '../data/mockData';
import { Comite } from '../types';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  FolderKanban,
  FileCheck,
  FileText,
  Calendar,
} from 'lucide-react';

export function ComitesView() {
  const usuario = useAuthStore((state) => state.user);
  const [comites, setComites] = useState<Comite[]>(comitesIniciales);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComite, setSelectedComite] = useState<Comite | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Comite>>({});

  const isAdmin = usuario?.rol === 'admin';

  const comitesFiltrados = comites.filter(
    (comite) =>
      comite.nombre_comite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comite.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNuevoComite = () => {
    setFormData({
      nombre_comite: '',
      descripcion: '',
      activo: true,
    });
    setSelectedComite(null);
    setIsFormOpen(true);
  };

  const handleEditarComite = (comite: Comite) => {
    setFormData(comite);
    setSelectedComite(comite);
    setIsFormOpen(true);
  };

  const handleGuardarComite = () => {
    if (selectedComite) {
      // Editar comité existente
      setComites(
        comites.map((c) =>
          c.id_comite === selectedComite.id_comite ? { ...c, ...formData } as Comite : c
        )
      );
    } else {
      // Crear nuevo comité
      const nuevoComite: Comite = {
        id_comite: Math.max(...comites.map((c) => c.id_comite)) + 1,
        nombre_comite: formData.nombre_comite || '',
        descripcion: formData.descripcion || '',
        fecha_creacion: new Date().toISOString().split('T')[0],
        activo: formData.activo ?? true,
      };
      setComites([...comites, nuevoComite]);
    }
    setIsFormOpen(false);
    setFormData({});
  };

  const handleEliminarComite = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este comité?')) {
      setComites(comites.filter((c) => c.id_comite !== id));
    }
  };

  const handleVerDetalle = (comite: Comite) => {
    setSelectedComite(comite);
    setIsDetailOpen(true);
  };

  const getComiteStats = (id_comite: number) => {
    const numAcuerdos = acuerdos.filter((a) => a.id_comite === id_comite).length;
    const numDocumentos = documentos.filter((d) => d.id_comite === id_comite).length;
    const sesiones = new Set(acuerdos.filter((a) => a.id_comite === id_comite).map((a) => a.numero_sesion)).size;
    return { numAcuerdos, numDocumentos, sesiones };
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">Gestión de Comités</h1>
          <p className="text-gray-600">
            Administra los comités y sus sesiones
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleNuevoComite}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Comité
          </Button>
        )}
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar comités por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Comités */}
      <div className="grid gap-6 md:grid-cols-2">
        {comitesFiltrados.map((comite) => {
          const stats = getComiteStats(comite.id_comite);
          return (
            <Card key={comite.id_comite} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FolderKanban className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-lg">{comite.nombre_comite}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600">{comite.descripcion}</p>
                  </div>
                  <Badge variant={comite.activo ? 'default' : 'secondary'}>
                    {comite.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Estadísticas */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl text-gray-900">{stats.sesiones}</div>
                      <div className="text-xs text-gray-600">Sesiones</div>
                    </div>
                    <div>
                      <div className="text-2xl text-gray-900">{stats.numAcuerdos}</div>
                      <div className="text-xs text-gray-600">Acuerdos</div>
                    </div>
                    <div>
                      <div className="text-2xl text-gray-900">{stats.numDocumentos}</div>
                      <div className="text-xs text-gray-600">Documentos</div>
                    </div>
                  </div>

                  {/* Fecha de creación */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t">
                    <Calendar className="w-4 h-4" />
                    <span>Creado: {formatFecha(comite.fecha_creacion)}</span>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleVerDetalle(comite)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalle
                    </Button>
                    {isAdmin && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditarComite(comite)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEliminarComite(comite.id_comite)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {comitesFiltrados.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderKanban className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron comités</p>
          </CardContent>
        </Card>
      )}

      {/* Dialog para Formulario */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent aria-describedby="form-description">
          <DialogHeader>
            <DialogTitle>
              {selectedComite ? 'Editar Comité' : 'Nuevo Comité'}
            </DialogTitle>
            <DialogDescription>
              {selectedComite ? 'Edita los detalles del comité' : 'Crea un nuevo comité'}
            </DialogDescription>
          </DialogHeader>
          <div id="form-description" className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre del Comité</Label>
              <Input
                id="nombre"
                value={formData.nombre_comite || ''}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_comite: e.target.value })
                }
                placeholder="Ej: Comité de Crédito"
              />
            </div>
            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion || ''}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Descripción del comité..."
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="activo"
                checked={formData.activo ?? true}
                onChange={(e) =>
                  setFormData({ ...formData, activo: e.target.checked })
                }
                className="rounded"
              />
              <Label htmlFor="activo">Comité Activo</Label>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleGuardarComite} className="flex-1">
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

      {/* Dialog para Detalle */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedComite?.nombre_comite}</DialogTitle>
            <DialogDescription>
              Detalles completos del comité seleccionado
            </DialogDescription>
          </DialogHeader>
          {selectedComite && (
            <div className="space-y-4">
              <div>
                <Label>Descripción</Label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedComite.descripcion}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Creación</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatFecha(selectedComite.fecha_creacion)}
                  </p>
                </div>
                <div>
                  <Label>Estado</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedComite.activo ? 'Activo' : 'Inactivo'}
                  </p>
                </div>
              </div>

              {/* Acuerdos del comité */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <FileCheck className="w-4 h-4" />
                  Acuerdos
                </Label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {acuerdos
                    .filter((a) => a.id_comite === selectedComite.id_comite)
                    .map((acuerdo) => (
                      <div
                        key={acuerdo.id_acuerdo}
                        className="p-3 border rounded-lg text-sm"
                      >
                        <p className="text-gray-900 mb-1">
                          {acuerdo.descripcion_acuerdo}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>Sesión {acuerdo.numero_sesion}</span>
                          <span>•</span>
                          <Badge className="text-xs" variant="outline">
                            {acuerdo.estatus}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Documentos del comité */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" />
                  Documentos
                </Label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {documentos
                    .filter((d) => d.id_comite === selectedComite.id_comite)
                    .map((doc) => (
                      <div
                        key={doc.id_documento}
                        className="p-3 border rounded-lg text-sm flex items-center justify-between"
                      >
                        <div>
                          <p className="text-gray-900">{doc.nombre_archivo}</p>
                          <p className="text-xs text-gray-600">
                            Sesión {doc.numero_sesion} • {doc.tipo_documento}
                          </p>
                        </div>
                        <Badge variant="outline">{doc.tipo_documento}</Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}