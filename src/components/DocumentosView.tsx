import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuthStore } from '../presentation/shared/store/auth.store';
import { comites, documentos as documentosIniciales } from '../data/mockData';
import { Documento } from '../types';
import {
  Plus,
  Search,
  FileText,
  Download,
  Trash2,
  Upload,
  Calendar,
  FolderOpen,
} from 'lucide-react';

export function DocumentosView() {
  const usuario = useAuthStore((state) => state.user);
  const [documentos, setDocumentos] = useState<Documento[]>(documentosIniciales);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroComite, setFiltroComite] = useState<string>('todos');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Documento>>({});

  const isAdmin = usuario?.rol === 'admin';

  const documentosFiltrados = documentos.filter((doc) => {
    const matchSearch = doc.nombre_archivo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchComite = filtroComite === 'todos' || doc.id_comite === parseInt(filtroComite);
    const matchTipo = filtroTipo === 'todos' || doc.tipo_documento === filtroTipo;

    return matchSearch && matchComite && matchTipo;
  });

  const handleNuevoDocumento = () => {
    setFormData({
      id_comite: comites[0].id_comite,
      numero_sesion: 1,
      tipo_documento: 'Acta',
      nombre_archivo: '',
      ruta_archivo: '',
    });
    setIsFormOpen(true);
  };

  const handleGuardarDocumento = () => {
    const nuevoDocumento: Documento = {
      id_documento: Math.max(...documentos.map((d) => d.id_documento)) + 1,
      id_comite: formData.id_comite || comites[0].id_comite,
      numero_sesion: formData.numero_sesion || 1,
      tipo_documento: formData.tipo_documento || 'Acta',
      nombre_archivo: formData.nombre_archivo || '',
      ruta_archivo: formData.ruta_archivo || `/documentos/${Date.now()}.pdf`,
      fecha_subida: new Date().toISOString().split('T')[0],
    };
    setDocumentos([...documentos, nuevoDocumento]);
    setIsFormOpen(false);
    setFormData({});
  };

  const handleEliminarDocumento = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este documento?')) {
      setDocumentos(documentos.filter((d) => d.id_documento !== id));
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Acta':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Carpeta':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Anexo':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Acta':
        return FileText;
      case 'Carpeta':
        return FolderOpen;
      case 'Anexo':
        return FileText;
      default:
        return FileText;
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const tiposDocumento = ['Acta', 'Carpeta', 'Anexo'];

  // Filtrar comités
  const comitesFiltrados = comites.filter((c) => 
    filtroComite === 'todos' || c.id_comite === parseInt(filtroComite)
  );

  // Agrupar documentos por comité
  const documentosPorComite = comitesFiltrados.reduce((acc, comite) => {
    const docs = documentosFiltrados.filter((d) => d.id_comite === comite.id_comite);
    if (docs.length > 0) {
      acc[comite.id_comite] = {
        comite,
        documentos: docs,
      };
    }
    return acc;
  }, {} as Record<number, { comite: typeof comites[0]; documentos: Documento[] }>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">Gestión de Documentos</h1>
          <p className="text-gray-600">
            Actas, carpetas y anexos de las sesiones de comité
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleNuevoDocumento}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Documento
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
                placeholder="Buscar documentos..."
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
                <SelectItem key="todos" value="todos">Todos los comités</SelectItem>
                {comites.map((comite) => (
                  <SelectItem key={comite.id_comite} value={comite.id_comite.toString()}>
                    {comite.nombre_comite}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="todos-tipos" value="todos">Todos los tipos</SelectItem>
                {tiposDocumento.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="text-sm text-gray-600">
        Mostrando {documentosFiltrados.length} de {documentos.length} documentos
      </div>

      {/* Documentos agrupados por comité */}
      <div className="space-y-6">
        {Object.values(documentosPorComite).map(({ comite, documentos }) => (
          <Card key={comite.id_comite}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-blue-600" />
                {comite.nombre_comite}
                <Badge variant="outline" className="ml-auto">
                  {documentos.length} documentos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentos.map((doc) => {
                  const Icon = getTipoIcon(doc.tipo_documento);
                  return (
                    <div
                      key={doc.id_documento}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm text-gray-900 truncate">
                              {doc.nombre_archivo}
                            </p>
                            <Badge className={getTipoColor(doc.tipo_documento)} variant="outline">
                              {doc.tipo_documento}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                            <span>Sesión {doc.numero_sesion}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatFecha(doc.fecha_subida)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        {isAdmin && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEliminarDocumento(doc.id_documento)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {documentosFiltrados.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron documentos</p>
          </CardContent>
        </Card>
      )}

      {/* Dialog para Formulario */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Documento</DialogTitle>
            <DialogDescription>
              Agrega un nuevo documento a la base de datos.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
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
              <Label htmlFor="tipo">Tipo de Documento</Label>
              <Select
                value={formData.tipo_documento}
                onValueChange={(value) =>
                  setFormData({ ...formData, tipo_documento: value as Documento['tipo_documento'] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposDocumento.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="nombre">Nombre del Archivo</Label>
              <Input
                id="nombre"
                value={formData.nombre_archivo || ''}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_archivo: e.target.value })
                }
                placeholder="Ej: Acta_Sesion_01.pdf"
              />
            </div>

            <div>
              <Label htmlFor="archivo">Subir Archivo</Label>
              <div className="mt-2 flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span>Click para subir</span> o arrastra el archivo
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOCX, XLSX (MAX. 10MB)</p>
                  </div>
                  <input id="archivo" type="file" className="hidden" />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Nota: Esta es una demostración. El archivo no se subirá realmente.
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleGuardarDocumento} className="flex-1">
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