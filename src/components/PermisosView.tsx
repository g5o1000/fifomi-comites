import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { comites, permisos as permisosIniciales, usuarios } from '../data/mockData';
import { Permiso } from '../types';
import {
  Plus,
  Users,
  Shield,
  Trash2,
  Edit,
  XCircle,
} from 'lucide-react';

export function PermisosView() {
  const [permisos, setPermisos] = useState<Permiso[]>(permisosIniciales);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Permiso>>({});
  const [selectedUsuario, setSelectedUsuario] = useState<number | null>(null);

  const handleNuevoPermiso = () => {
    setFormData({
      id_usuario: usuarios[1].id,
      id_comite: comites[0].id_comite,
      puede_leer: true,
      puede_escribir: false,
      puede_eliminar: false,
    });
    setIsFormOpen(true);
  };

  const handleGuardarPermiso = () => {
    if (formData.id_permiso) {
      // Estamos editando un permiso existente
      setPermisos(
        permisos.map((p) =>
          p.id_permiso === formData.id_permiso
            ? { ...p, ...formData } as Permiso
            : p
        )
      );
    } else {
      // Verificar si ya existe un permiso para este usuario y comité
      const permisoExistente = permisos.find(
        (p) =>
          p.id_usuario === formData.id_usuario &&
          p.id_comite === formData.id_comite
      );

      if (permisoExistente) {
        // Actualizar permiso existente
        setPermisos(
          permisos.map((p) =>
            p.id_permiso === permisoExistente.id_permiso
              ? { ...p, ...formData } as Permiso
              : p
          )
        );
      } else {
        // Crear nuevo permiso
        const nuevoPermiso: Permiso = {
          id_permiso: Math.max(...permisos.map((p) => p.id_permiso)) + 1,
          id_usuario: formData.id_usuario || usuarios[1].id,
          id_comite: formData.id_comite || comites[0].id_comite,
          puede_leer: formData.puede_leer ?? true,
          puede_escribir: formData.puede_escribir ?? false,
          puede_eliminar: formData.puede_eliminar ?? false,
          fecha_asignacion: new Date().toISOString().split('T')[0],
        };
        setPermisos([...permisos, nuevoPermiso]);
      }
    }
    setIsFormOpen(false);
    setFormData({});
  };

  const handleEliminarPermiso = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este permiso?')) {
      setPermisos(permisos.filter((p) => p.id_permiso !== id));
    }
  };

  const handleEditarPermiso = (permiso: Permiso) => {
    setFormData({
      id_permiso: permiso.id_permiso,
      id_usuario: permiso.id_usuario,
      id_comite: permiso.id_comite,
      puede_leer: permiso.puede_leer,
      puede_escribir: permiso.puede_escribir,
      puede_eliminar: permiso.puede_eliminar,
    });
    setIsFormOpen(true);
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Agrupar permisos por usuario
  const permisosPorUsuario = usuarios.map((usuario) => {
    const permisosUsuario = permisos.filter((p) => p.id_usuario === usuario.id);
    return {
      usuario,
      permisos: permisosUsuario,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">Gestión de Permisos</h1>
          <p className="text-gray-600">
            Administra los permisos de acceso de usuarios a los comités
          </p>
        </div>
        <Button onClick={handleNuevoPermiso}>
          <Plus className="w-4 h-4 mr-2" />
          Asignar Permiso
        </Button>
      </div>

      {/* Resumen de permisos */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">{usuarios.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Permisos Activos</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">{permisos.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Comités con Permisos</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900">
              {new Set(permisos.map((p) => p.id_comite)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Permisos por usuario */}
      <div className="space-y-6">
        {permisosPorUsuario.map(({ usuario, permisos: permisosUsuario }) => (
          <Card key={usuario.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{usuario.nombre}</CardTitle>
                    <p className="text-sm text-gray-600">{usuario.email}</p>
                  </div>
                </div>
                <Badge variant={usuario.rol === 'admin' ? 'default' : 'secondary'}>
                  {usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {permisosUsuario.length > 0 ? (
                <div className="space-y-3">
                  {permisosUsuario.map((permiso) => {
                    const comite = comites.find((c) => c.id_comite === permiso.id_comite);
                    return (
                      <div
                        key={permiso.id_permiso}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-2">
                            {comite?.nombre_comite}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {permiso.puede_leer && (
                              <Badge variant="outline" className="text-xs bg-blue-50">
                                <Edit className="w-3 h-3 mr-1" />
                                Lectura
                              </Badge>
                            )}
                            {permiso.puede_escribir && (
                              <Badge variant="outline" className="text-xs bg-green-50">
                                <Edit className="w-3 h-3 mr-1" />
                                Escritura
                              </Badge>
                            )}
                            {permiso.puede_eliminar && (
                              <Badge variant="outline" className="text-xs bg-red-50">
                                <Trash2 className="w-3 h-3 mr-1" />
                                Eliminación
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Asignado: {formatFecha(permiso.fecha_asignacion)}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditarPermiso(permiso)}
                            className="text-[#7c2539] hover:text-[#5d1b2a] hover:bg-[#7c2539]/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEliminarPermiso(permiso.id_permiso)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Sin permisos asignados</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para Formulario */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {formData.id_permiso ? 'Editar Permiso' : 'Asignar Permiso'}
            </DialogTitle>
            <DialogDescription>
              {formData.id_permiso ? 'Actualiza los permisos del usuario' : 'Asigna permisos a un usuario'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="usuario">Usuario</Label>
              <Select
                value={formData.id_usuario?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, id_usuario: parseInt(value) })
                }
                disabled={!!formData.id_permiso}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar usuario" />
                </SelectTrigger>
                <SelectContent>
                  {usuarios
                    .filter((u) => u.rol !== 'admin')
                    .map((usuario) => (
                      <SelectItem key={usuario.id} value={usuario.id.toString()}>
                        {usuario.nombre} ({usuario.email})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comite">Comité</Label>
              <Select
                value={formData.id_comite?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, id_comite: parseInt(value) })
                }
                disabled={!!formData.id_permiso}
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

            <div className="space-y-3 pt-2">
              <Label>Permisos</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="leer"
                  checked={formData.puede_leer ?? true}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, puede_leer: checked as boolean })
                  }
                />
                <label
                  htmlFor="leer"
                  className="text-sm cursor-pointer flex items-center gap-2"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                  <span>Puede leer</span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="escribir"
                  checked={formData.puede_escribir ?? false}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, puede_escribir: checked as boolean })
                  }
                />
                <label
                  htmlFor="escribir"
                  className="text-sm cursor-pointer flex items-center gap-2"
                >
                  <Edit className="w-4 h-4 text-green-600" />
                  <span>Puede escribir (crear y editar)</span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="eliminar"
                  checked={formData.puede_eliminar ?? false}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, puede_eliminar: checked as boolean })
                  }
                />
                <label
                  htmlFor="eliminar"
                  className="text-sm cursor-pointer flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span>Puede eliminar</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleGuardarPermiso} className="flex-1">
                {formData.id_permiso ? 'Actualizar' : 'Asignar'}
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