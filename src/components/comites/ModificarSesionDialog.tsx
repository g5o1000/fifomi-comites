import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Upload, Calendar as CalendarIcon } from 'lucide-react';
import type { SesionData } from '../../data/comitesData';
import { CustomCalendar } from '../ui/custom-calendar';
import { CustomAlert } from '../ui/custom-alert';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

interface ModificarSesionDialogProps {
  sesion: SesionData;
  comiteNombre: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModificarSesionDialog({
  sesion,
  comiteNombre,
  open,
  onOpenChange,
}: ModificarSesionDialogProps) {
  const [date, setDate] = useState<Date | undefined>(
    sesion.fecha ? new Date(sesion.fecha) : undefined
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  // Estados para los diálogos personalizados
  const [alert, setAlert] = useState<{
    type: 'error' | 'success' | 'confirm';
    title: string;
    message: string;
    open: boolean;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    type: 'error',
    title: '',
    message: '',
    open: false,
  });

  const [formData, setFormData] = useState({
    comite: comiteNombre,
    tipoSesion: sesion.tipoSesion || 'Ordinaria',
    numeroSesion: sesion.numeroSesion?.toString() || '',
    numeroSesionTexto: sesion.nombreSesion || '',
    fecha: sesion.fecha || '',
    actaArchivo: null as File | null,
    nombreActa: sesion.acta || 'PENDIENTE',
    carpetaArchivo: null as File | null,
    nombreCarpeta: sesion.carpeta || '',
    incluyeAnexos: true,
    anexosArchivos: [] as File[],
  });

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit ejecutado en ModificarSesionDialog');
    
    // Validación de campos obligatorios
    if (!formData.numeroSesion.trim()) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, ingresa el número de sesión.',
        open: true,
      });
      return;
    }
    
    if (!formData.numeroSesionTexto.trim()) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, ingresa el nombre de la sesión.',
        open: true,
      });
      return;
    }
    
    if (!date) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, selecciona la fecha de la sesión.',
        open: true,
      });
      return;
    }
    
    if (!formData.nombreActa.trim() || formData.nombreActa === 'PENDIENTE') {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, ingresa el nombre del acta.',
        open: true,
      });
      return;
    }
    
    // Confirmación antes de guardar
    setAlert({
      type: 'confirm',
      title: 'Confirmar Modificación',
      message: '¿Está seguro que desea modificar la sesión con los datos capturados?\n\nVerifique que toda la información sea correcta antes de continuar.',
      open: true,
      confirmText: 'Confirmar y Guardar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        // Aquí se guardarían los datos
        console.log('Guardar cambios:', formData);
        
        // Mostrar mensaje de éxito
        setAlert({
          type: 'success',
          title: 'Registro Exitoso',
          message: 'La sesión ha sido modificada correctamente.\n\nLos cambios han sido guardados en el sistema.',
          open: true,
          confirmText: 'Entendido',
          onConfirm: () => {
            // Cerrar el diálogo después de mostrar el éxito
            onOpenChange(false);
          },
        });
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (field === 'anexos') {
        setFormData({ ...formData, anexosArchivos: Array.from(files) });
      } else {
        setFormData({ ...formData, [`${field}Archivo`]: files[0] });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-7xl overflow-hidden shadow-2xl p-0 backdrop-blur-xl bg-white [&>button]:text-white [&>button]:hover:text-white [&>button]:opacity-90 [&>button]:hover:opacity-100 [&>button]:hover:scale-110">
        <DialogHeader className="bg-[#022E5B] px-8 py-5 shadow-lg">
          <DialogTitle className="text-white text-xl font-semibold">
            Modificación de Actas y Carpetas de las Sesiones del {comiteNombre}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario para modificar actas, carpetas y anexos de las sesiones del comité
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5 bg-[#F5F8FA]">
          {/* Primera fila - 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Selecciona el Comité */}
            <div className="space-y-2">
              <Label htmlFor="comite">Selecciona el Comité:</Label>
              <Select
                value={formData.comite}
                onValueChange={(value) => setFormData({ ...formData, comite: value })}
              >
                <SelectTrigger id="comite" className="bg-[#E8EDF0]">
                  <SelectValue placeholder="Selecciona un comité" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem key="comite-tecnico" value="Comité Técnico">Comité Técnico</SelectItem>
                  <SelectItem key="comite-adquisiciones" value="Comité de Adquisiciones, Arrendamientos y Servicios">
                    Comité de Adquisiciones, Arrendamientos y Servicios
                  </SelectItem>
                  <SelectItem key="comite-auditoria" value="Comité de Auditoría">Comité de Auditoría</SelectItem>
                  <SelectItem key="comite-calidad" value="Comité de Calidad / Comisión de Calidad">
                    Comité de Calidad / Comisión de Calidad
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Sesión con radio buttons */}
            <div className="space-y-2">
              <Label>Tipo de Sesión:</Label>
              <div className="flex items-center space-x-6 h-10">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="tipo-ordinaria"
                    name="tipoSesion"
                    value="Ordinaria"
                    checked={formData.tipoSesion === 'Ordinaria'}
                    onChange={(e) => setFormData({ ...formData, tipoSesion: e.target.value })}
                    className="w-4 h-4 text-[#022E5B] focus:ring-[#022E5B]"
                  />
                  <Label htmlFor="tipo-ordinaria" className="font-normal cursor-pointer">
                    Ordinaria
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="tipo-extraordinaria"
                    name="tipoSesion"
                    value="Extraordinaria"
                    checked={formData.tipoSesion === 'Extraordinaria'}
                    onChange={(e) => setFormData({ ...formData, tipoSesion: e.target.value })}
                    className="w-4 h-4 text-[#022E5B] focus:ring-[#022E5B]"
                  />
                  <Label htmlFor="tipo-extraordinaria" className="font-normal cursor-pointer">
                    Extraordinaria
                  </Label>
                </div>
              </div>
            </div>

            {/* Fecha de la Sesión */}
            <div className="space-y-2 relative">
              <Label>Fecha de la Sesión:</Label>
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full h-10 px-3 rounded-md bg-[#E8EDF0] border border-gray-300 flex items-center justify-between text-left hover:bg-[#dce4e9] transition-colors cursor-pointer"
              >
                <span className="text-sm">
                  {date ? format(date, 'dd/MM/yyyy', { locale: es }) : 'Selecciona una fecha'}
                </span>
                <CalendarIcon className="w-5 h-5 text-[#022E5B]" />
              </button>
              {showCalendar && (
                <div className="absolute z-50 mt-1" ref={calendarRef}>
                  <CustomCalendar
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      if (selectedDate) {
                        setFormData({ ...formData, fecha: format(selectedDate, 'yyyy-MM-dd') });
                      }
                      setShowCalendar(false);
                    }}
                  />
                </div>
              )}
              <p className="text-xs text-gray-500">
                Selecciona la fecha del Calendario
              </p>
            </div>
          </div>

          {/* Segunda fila - 2 columnas para No. de Sesión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* No. de Sesión (número) */}
            <div className="space-y-2">
              <Label htmlFor="numeroSesion">No. de Sesión:</Label>
              <Input
                id="numeroSesion"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.numeroSesion}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, numeroSesion: value });
                }}
                placeholder="199"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[#E8EDF0]"
              />
            </div>

            {/* No. de Sesión (texto largo) */}
            <div className="space-y-2">
              <Label htmlFor="numeroSesionTexto">No. de Sesión:</Label>
              <Input
                id="numeroSesionTexto"
                type="text"
                value={formData.numeroSesionTexto}
                onChange={(e) => setFormData({ ...formData, numeroSesionTexto: e.target.value })}
                placeholder="Centésima Nonagésima Novena Sesión Ordinaria"
                className="bg-[#E8EDF0]"
              />
              <p className="text-xs text-gray-500">
                Ej: Centésima Primera...
              </p>
            </div>
          </div>

          {/* Tercera fila - 2 columnas para Acta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Acta de la Sesión */}
            <div className="space-y-2">
              <Label htmlFor="acta">Acta de la Sesión:</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-gray-300 bg-[#E8EDF0]"
                  onClick={() => document.getElementById('acta-file')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar archivo
                </Button>
                <span className="text-sm text-gray-600 truncate">
                  {formData.actaArchivo
                    ? formData.actaArchivo.name
                    : 'Ningún archivo seleccionado'}
                </span>
                <input
                  id="acta-file"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'acta')}
                />
              </div>
              <p className="text-xs text-gray-500">
                Seleccione el archivo PDF del acta de la sesión.
              </p>
            </div>

            {/* Nombre del Acta */}
            <div className="space-y-2">
              <Label htmlFor="nombreActa">Nombre del Acta:</Label>
              <Input
                id="nombreActa"
                type="text"
                value={formData.nombreActa}
                onChange={(e) => setFormData({ ...formData, nombreActa: e.target.value })}
                placeholder="PENDIENTE"
                className="bg-[#E8EDF0]"
              />
              <p className="text-xs text-gray-500">
                Ej: Acta 1a Sesión Ordinaria ...
              </p>
            </div>
          </div>

          {/* Cuarta fila - 2 columnas para Carpeta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Carpeta de la Sesión */}
            <div className="space-y-2">
              <Label htmlFor="carpeta">Carpeta de la Sesión:</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-gray-300 bg-[#E8EDF0]"
                  onClick={() => document.getElementById('carpeta-file')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar archivo
                </Button>
                <span className="text-sm text-gray-600 truncate">
                  {formData.carpetaArchivo
                    ? formData.carpetaArchivo.name
                    : 'Ningún archivo seleccionado'}
                </span>
                <input
                  id="carpeta-file"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'carpeta')}
                />
              </div>
              <p className="text-xs text-gray-500">
                Selecciona archivo PDF de la carpeta de la sesión.
              </p>
            </div>

            {/* Nombre de la Carpeta */}
            <div className="space-y-2">
              <Label htmlFor="nombreCarpeta">Nombre de la Carpeta:</Label>
              <Input
                id="nombreCarpeta"
                type="text"
                value={formData.nombreCarpeta}
                onChange={(e) => setFormData({ ...formData, nombreCarpeta: e.target.value })}
                placeholder="Carpeta SO 199 Comité Técnico FIFOMI"
                className="bg-[#E8EDF0]"
              />
              <p className="text-xs text-gray-500">
                Ej: Carpeta 1a Sesión Ordinaria ...
              </p>
            </div>
          </div>

          {/* Quinta fila - Incluye Anexos y Anexos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Incluye Anexos */}
            <div className="space-y-2">
              <Label>Incluye Anexos:</Label>
              <div className="flex items-center space-x-6 h-10">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="anexos-si"
                    name="incluyeAnexos"
                    checked={formData.incluyeAnexos}
                    onChange={() => setFormData({ ...formData, incluyeAnexos: true })}
                    className="w-4 h-4 text-[#BA0233] focus:ring-[#BA0233]"
                  />
                  <Label htmlFor="anexos-si" className="font-normal cursor-pointer">
                    Sí
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="anexos-no"
                    name="incluyeAnexos"
                    checked={!formData.incluyeAnexos}
                    onChange={() => setFormData({ ...formData, incluyeAnexos: false })}
                    className="w-4 h-4 text-[#BA0233] focus:ring-[#BA0233]"
                  />
                  <Label htmlFor="anexos-no" className="font-normal cursor-pointer">
                    No
                  </Label>
                </div>
              </div>
            </div>

            {/* Anexos de la Sesión */}
            {formData.incluyeAnexos && (
              <div className="space-y-2">
                <Label htmlFor="anexos">Anexos de la Sesión:</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                    onClick={() => document.getElementById('anexos-files')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Elegir archivos
                  </Button>
                  <span className="text-sm text-gray-600 truncate">
                    {formData.anexosArchivos.length > 0
                      ? `${formData.anexosArchivos.length} archivo(s) seleccionado(s)`
                      : 'Ningún archivo seleccionado'}
                  </span>
                  <input
                    id="anexos-files"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'anexos')}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Utiliza la tecla CTRL para seleccionar múltiples archivos a la vez.
                </p>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="min-w-[120px]"
            >
              Regresar
            </Button>
            <Button
              type="submit"
              className="min-w-[120px] bg-[#022E5B] hover:bg-[#011d40] text-white shadow-md"
            >
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
      <CustomAlert
        type={alert.type}
        title={alert.title}
        message={alert.message}
        open={alert.open}
        onConfirm={alert.onConfirm}
        onClose={() => setAlert({ type: 'error', title: '', message: '', open: false })}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
      />
    </Dialog>
  );
}