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
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { AcuerdoData } from '../../data/comitesData';
import { CustomCalendar } from '../ui/custom-calendar';
import { CustomAlert } from '../ui/custom-alert';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

interface ModificarAcuerdoDialogProps {
  acuerdo: AcuerdoData;
  comiteNombre: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModificarAcuerdoDialog({
  acuerdo,
  comiteNombre,
  open,
  onOpenChange,
}: ModificarAcuerdoDialogProps) {
  const [date, setDate] = useState<Date | undefined>(
    acuerdo.fecha ? new Date(acuerdo.fecha) : undefined
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
    numeroSesion: acuerdo.numeroSesion?.toString() || '',
    nombreSesion: acuerdo.nombreSesion || '',
    tipoSesion: acuerdo.tipoSesion || 'Ordinaria',
    fechaSesion: acuerdo.fecha || '',
    tipoAsunto: 'Decisorios', // Valor por defecto actualizado
    asuntoTemaInforme: acuerdo.tema || '',
    numeroAcuerdoInterno: acuerdo.resolucion || '',
    acuerdoTexto: acuerdo.acuerdo || '',
    terminosCondiciones: '',
    seguimiento: '',
    estatus: acuerdo.estatus || 'Aprobado',
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
    console.log('handleSubmit ejecutado en ModificarAcuerdoDialog');
    
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
    
    if (!formData.nombreSesion.trim()) {
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
    
    if (!formData.asuntoTemaInforme.trim()) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, ingresa el Asunto/Tema/Informe.',
        open: true,
      });
      return;
    }
    
    if (!formData.acuerdoTexto.trim()) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, ingresa el texto del acuerdo.',
        open: true,
      });
      return;
    }
    
    // Confirmación antes de guardar
    setAlert({
      type: 'confirm',
      title: 'Confirmar Modificación',
      message: '¿Está seguro que desea modificar el acuerdo con los datos capturados?\n\nVerifique que toda la información sea correcta antes de continuar.',
      open: true,
      confirmText: 'Confirmar y Guardar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        // Aquí se guardarían los datos
        console.log('Guardar cambios del acuerdo:', formData);
        
        // Mostrar mensaje de éxito
        setAlert({
          type: 'success',
          title: 'Registro Exitoso',
          message: 'El acuerdo ha sido modificado correctamente.\n\nLos cambios han sido guardados en el sistema.',
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-5xl max-h-[90vh] flex flex-col shadow-2xl p-0 backdrop-blur-xl bg-white [&>button]:text-white [&>button]:hover:text-white [&>button]:opacity-90 [&>button]:hover:opacity-100 [&>button]:hover:scale-110">
        <DialogHeader className="bg-[#022E5B] px-8 py-5 shadow-lg flex-shrink-0">
          <DialogTitle className="text-white text-xl font-semibold">
            Formulario de Actualización del {comiteNombre}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario para actualizar información de acuerdos del comité
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-5 bg-[#F5F8FA]">
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

            {/* No. de Sesión */}
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

            {/* No. de Sesión (texto) */}
            <div className="space-y-2">
              <Label htmlFor="nombreSesion">No. de Sesión:</Label>
              <Input
                id="nombreSesion"
                type="text"
                value={formData.nombreSesion}
                onChange={(e) => setFormData({ ...formData, nombreSesion: e.target.value })}
                placeholder="Centésima Nonagésima Novena Sesión Ordinaria"
                className="bg-[#E8EDF0]"
              />
              <p className="text-xs text-gray-500">
                Ejemplo: Centésima Primera, Primera Extraordinaria 2018...
              </p>
            </div>
          </div>

          {/* Segunda fila - 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tipo de Sesión */}
            <div className="space-y-2">
              <Label>Tipo de Sesión:</Label>
              <Select
                value={formData.tipoSesion}
                onValueChange={(value) => setFormData({ ...formData, tipoSesion: value })}
              >
                <SelectTrigger className="bg-[#E8EDF0]">
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem key="ordinaria" value="Ordinaria">Ordinaria</SelectItem>
                  <SelectItem key="extraordinaria" value="Extraordinaria">Extraordinaria</SelectItem>
                </SelectContent>
              </Select>
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
                <CalendarIcon className="w-5 h-5 text-[#7c2539]" />
              </button>
              {showCalendar && (
                <div className="absolute z-50 mt-1" ref={calendarRef}>
                  <CustomCalendar
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      if (selectedDate) {
                        setFormData({ ...formData, fechaSesion: format(selectedDate, 'yyyy-MM-dd') });
                      }
                      setShowCalendar(false);
                    }}
                  />
                </div>
              )}
              <p className="text-xs text-gray-500">
                Selecciona la fecha del Calendario o captura y da clic mm-aaaa
              </p>
            </div>
          </div>

          {/* Tercera fila - Tipo de Asunto */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label>Tipo de Asunto:</Label>
              <Select
                value={formData.tipoAsunto}
                onValueChange={(value) => setFormData({ ...formData, tipoAsunto: value })}
              >
                <SelectTrigger className="bg-[#E8EDF0]">
                  <SelectValue placeholder="Selecciona el tipo de asunto" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem key="decisorios" value="Decisorios">Decisorios</SelectItem>
                  <SelectItem key="informativos" value="Informativos">Informativos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cuarta fila - Asunto/Tema/Informe */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label htmlFor="asuntoTemaInforme">Asunto/ Tema/ Informe, que requiere de un acuerdo:</Label>
              <Textarea
                id="asuntoTemaInforme"
                value={formData.asuntoTemaInforme}
                onChange={(e) => setFormData({ ...formData, asuntoTemaInforme: e.target.value })}
                placeholder="Se APRUEBA el orden del día para la Centésima Nonagésima Novena Sesión Ordinaria"
                className="bg-[#E8EDF0] min-h-[80px]"
              />
            </div>
          </div>

          {/* Quinta fila - No. de acuerdo interno */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label htmlFor="numeroAcuerdoInterno">No. de acuerdo interno o de control:</Label>
              <Input
                id="numeroAcuerdoInterno"
                type="text"
                value={formData.numeroAcuerdoInterno}
                onChange={(e) => setFormData({ ...formData, numeroAcuerdoInterno: e.target.value })}
                placeholder="2064-FFM-199-O"
                className="bg-[#E8EDF0]"
              />
              <p className="text-xs text-gray-500">
                (N/A en caso de no aplicar)
              </p>
            </div>
          </div>

          {/* Sexta fila - Acuerdo */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label htmlFor="acuerdoTexto">Acuerdo:</Label>
              <Textarea
                id="acuerdoTexto"
                value={formData.acuerdoTexto}
                onChange={(e) => setFormData({ ...formData, acuerdoTexto: e.target.value })}
                placeholder="Con fundamento en el artículo 18, fracción II del Reglamento de la Ley Federal de las Entidades Paraestatales, el Comité Técnico del Fideicomiso de Fomento Minero APRUEBA el orden del día para la Centésima Nonagésima Novena Sesión Ordinaria"
                className="bg-[#E8EDF0] min-h-[120px]"
              />
            </div>
          </div>

          {/* Séptima fila - Términos y Condiciones */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label htmlFor="terminosCondiciones">Términos y Condiciones:</Label>
              <Textarea
                id="terminosCondiciones"
                value={formData.terminosCondiciones}
                onChange={(e) => setFormData({ ...formData, terminosCondiciones: e.target.value })}
                placeholder="N/A"
                className="bg-[#E8EDF0] min-h-[80px]"
              />
            </div>
          </div>

          {/* Octava fila - Seguimiento */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label htmlFor="seguimiento">Seguimiento:</Label>
              <Textarea
                id="seguimiento"
                value={formData.seguimiento}
                onChange={(e) => setFormData({ ...formData, seguimiento: e.target.value })}
                placeholder="N/A"
                className="bg-[#E8EDF0] min-h-[80px]"
              />
            </div>
          </div>

          {/* Novena fila - Estatus */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label>Estatus:</Label>
              <Select
                value={formData.estatus}
                onValueChange={(value) => setFormData({ ...formData, estatus: value })}
              >
                <SelectTrigger className="bg-[#E8EDF0]">
                  <SelectValue placeholder="Selecciona el estatus" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem key="aprobado" value="Aprobado">Aprobado</SelectItem>
                  <SelectItem key="autorizado" value="Autorizado">Autorizado</SelectItem>
                  <SelectItem key="en-proceso" value="En Proceso">En Proceso</SelectItem>
                  <SelectItem key="pendiente" value="Pendiente">Pendiente</SelectItem>
                  <SelectItem key="enterados" value="Enterados">Enterados</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              className="min-w-[120px] bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8] text-white shadow-md"
            >
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
      
      {/* Diálogos de alerta */}
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