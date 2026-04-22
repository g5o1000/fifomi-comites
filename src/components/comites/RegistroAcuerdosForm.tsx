import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Save, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { NativeSelect } from '../ui/native-select';
import { Card, CardContent, CardHeader } from '../ui/card';
import { CustomCalendar } from '../ui/custom-calendar';
import { CustomAlert } from '../ui/custom-alert';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface RegistroAcuerdosFormProps {
  comiteNombre: string;
  comiteId: string;
  onBack?: () => void;
  onSave?: (data: any) => void;
  className?: string;
}

export function RegistroAcuerdosForm({
  comiteNombre,
  comiteId,
  onBack,
  onSave,
  className,
}: RegistroAcuerdosFormProps) {
  const [numeroSesion, setNumeroSesion] = useState<string>('');
  const [nombreSesion, setNombreSesion] = useState<string>('');
  const [tipoSesion, setTipoSesion] = useState<string>('ordinaria');
  const [fechaSesion, setFechaSesion] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [tipoAsunto, setTipoAsunto] = useState<string>('decisiones');
  const [asunto, setAsunto] = useState<string>('');
  const [numeroAcuerdo, setNumeroAcuerdo] = useState<string>('');
  const [tipoDocumento, setTipoDocumento] = useState<string>('acuerdo');
  const [acuerdoResolucion, setAcuerdoResolucion] = useState<string>('');
  const [terminosCondiciones, setTerminosCondiciones] = useState<string>('');
  const [seguimiento, setSeguimiento] = useState<string>('');
  const [estatus, setEstatus] = useState<string>('autorizado');

  // Estados para CustomAlert
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

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // No cerrar si se hace clic en el calendario o en un SelectContent (portal)
      if (
        calendarRef.current && 
        !calendarRef.current.contains(target) &&
        // Verificar si el clic fue en un portal de Radix (SelectContent)
        !(target as Element).closest('[role="listbox"]') &&
        !(target as Element).closest('[role="option"]')
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      // Usar captura para manejar el evento antes que otros handlers
      document.addEventListener('mousedown', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [showCalendar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de campos obligatorios
    if (!numeroSesion.trim()) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, ingresa el número de sesión.',
        open: true,
      });
      return;
    }

    if (!nombreSesion.trim()) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, ingresa el nombre de la sesión.',
        open: true,
      });
      return;
    }

    if (!fechaSesion) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, selecciona la fecha de la sesión.',
        open: true,
      });
      return;
    }

    if (!asunto.trim()) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, describe el asunto, tema o informe.',
        open: true,
      });
      return;
    }

    if (!acuerdoResolucion.trim()) {
      setAlert({
        type: 'error',
        title: 'Información Incompleta',
        message: 'Por favor, ingresa el contenido del acuerdo o resolución.',
        open: true,
      });
      return;
    }

    // Mostrar diálogo de confirmación
    setAlert({
      type: 'confirm',
      title: '¿Confirmar Registro?',
      message: '¿Estás seguro de que deseas guardar este acuerdo? Verifica que toda la información sea correcta.',
      open: true,
      confirmText: 'Guardar Acuerdo',
      cancelText: 'Cancelar',
      onConfirm: () => {
        const data = {
          comiteId,
          numeroSesion,
          nombreSesion,
          tipoSesion,
          fechaSesion,
          tipoAsunto,
          asunto,
          numeroAcuerdo: numeroAcuerdo || 'N/A',
          tipoDocumento,
          acuerdoResolucion,
          terminosCondiciones: terminosCondiciones || 'N/A',
          seguimiento: seguimiento || 'N/A',
          estatus,
        };
        console.log('Guardando acuerdo:', data);
        
        // Mostrar mensaje de éxito
        setAlert({
          type: 'success',
          title: 'Acuerdo Registrado',
          message: 'El acuerdo se ha registrado exitosamente en el sistema.',
          open: true,
          confirmText: 'Aceptar',
          onConfirm: () => {
            if (onSave) {
              onSave(data);
            }
            handleReset();
          },
        });
      },
    });
  };

  const handleReset = () => {
    setNumeroSesion('');
    setNombreSesion('');
    setTipoSesion('ordinaria');
    setFechaSesion(undefined);
    setTipoAsunto('decisiones');
    setAsunto('');
    setNumeroAcuerdo('');
    setTipoDocumento('acuerdo');
    setAcuerdoResolucion('');
    setTerminosCondiciones('');
    setSeguimiento('');
    setEstatus('autorizado');
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2 font-bold">
            Formulario de Registro de Acuerdos del {comiteNombre}
          </h2>
          <p className="text-sm text-gray-600">
            Captura y gestión de acuerdos
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

      {/* Formulario */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#08546C] to-[#022534] text-white py-4">
          <h3 className="text-lg">Datos del Acuerdo</h3>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SECCIÓN 1: INFORMACIÓN DE LA SESIÓN */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Información de la Sesión</h4>
              
              {/* Fila 1: Comité (ancho completo) */}
              <div className="grid grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="comite">Comité</Label>
                  <NativeSelect id="comite" value={comiteId} disabled className="bg-gray-100">
                    <option value={comiteId}>{comiteNombre}</option>
                  </NativeSelect>
                </div>
              </div>

              {/* Fila 2: No. Sesión, Tipo de Sesión, Fecha - campos cortos juntos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numeroSesion">No. de Sesión</Label>
                  <Input
                    id="numeroSesion"
                    type="text"
                    value={numeroSesion}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Solo permitir números
                      if (value === '' || /^\d+$/.test(value)) {
                        setNumeroSesion(value);
                      }
                    }}
                    placeholder="199"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoSesion">Tipo de Sesión</Label>
                  <NativeSelect 
                    id="tipoSesion" 
                    value={tipoSesion} 
                    onChange={(e) => setTipoSesion(e.target.value)}
                  >
                    <option value="ordinaria">Ordinaria</option>
                    <option value="extraordinaria">Extraordinaria</option>
                  </NativeSelect>
                </div>

                <div className="space-y-2 relative">
                  <Label>Fecha de la Sesión</Label>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm">
                      {fechaSesion ? format(fechaSesion, 'dd/MM/yyyy', { locale: es }) : 'Selecciona fecha'}
                    </span>
                    <CalendarIcon className="w-5 h-5 text-[#022E5B]" />
                  </button>
                  {showCalendar && (
                    <div className="absolute z-50 mt-1" ref={calendarRef}>
                      <CustomCalendar
                        selected={fechaSesion}
                        onSelect={(selectedDate) => {
                          setFechaSesion(selectedDate);
                          setShowCalendar(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Fila 3: Nombre de la Sesión (ancho completo - campo largo) */}
              <div className="grid grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="nombreSesion">
                    Nombre de la Sesión
                  </Label>
                  <Input
                    id="nombreSesion"
                    type="text"
                    value={nombreSesion}
                    onChange={(e) => setNombreSesion(e.target.value)}
                    placeholder="Ej: Centésima Nonagésima Novena Sesión Ordinaria"
                  />
                  <p className="text-xs text-gray-500">
                    Ejemplo: Centésima Primera / Primera Extraordinaria 2016
                  </p>
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: ASUNTO Y TIPO */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Asunto</h4>
              
              {/* Fila 4: Tipo de Asunto (campo corto) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoAsunto">Tipo de Asunto</Label>
                  <NativeSelect 
                    id="tipoAsunto"
                    value={tipoAsunto} 
                    onChange={(e) => setTipoAsunto(e.target.value)}
                  >
                    <option value="decisiones">Decisiones</option>
                    <option value="informes">Informes</option>
                    <option value="asuntos">Asuntos</option>
                  </NativeSelect>
                </div>
              </div>

              {/* Fila 5: Asunto/Tema/Informe (ancho completo - campo largo) */}
              <div className="grid grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto / Tema / Informe que requiere de un acuerdo</Label>
                  <Textarea
                    id="asunto"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder="Registro de asuntos, temas, informes, incluyendo el Orden del día que requiere aprobación de sus integrantes y se formaliza con un acuerdo"
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: ACUERDO/RESOLUCIÓN */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Acuerdo / Resolución</h4>
              
              {/* Fila 6: Tipo de Documento y No. de Control */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                  <NativeSelect 
                    id="tipoDocumento"
                    value={tipoDocumento} 
                    onChange={(e) => setTipoDocumento(e.target.value)}
                  >
                    <option value="acuerdo">Acuerdo</option>
                    <option value="resolucion">Resolución</option>
                  </NativeSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numeroAcuerdo">
                    No. de Control Interno
                  </Label>
                  <Input
                    id="numeroAcuerdo"
                    type="text"
                    value={numeroAcuerdo}
                    onChange={(e) => setNumeroAcuerdo(e.target.value)}
                    placeholder="2064-FFM-199-O"
                  />
                  <p className="text-xs text-gray-500">
                    N/A en caso de no aplicar
                  </p>
                </div>
              </div>

              {/* Fila 7: Contenido del Acuerdo/Resolución (ancho completo - campo largo) */}
              <div className="grid grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="acuerdoResolucion">
                    Contenido del Acuerdo / Resolución
                  </Label>
                  <Textarea
                    id="acuerdoResolucion"
                    value={acuerdoResolucion}
                    onChange={(e) => setAcuerdoResolucion(e.target.value)}
                    placeholder="Con fundamento en el artículo 18, fracción II del Reglamento de la Ley Federal de las Entidades Paraestatales, el Comité Técnico del Fideicomiso de Fomento Minero APRUEBA..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 4: COMPLEMENTARIOS */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Información Complementaria</h4>
              
              {/* Fila 8: Términos y Condiciones (ancho completo) */}
              <div className="grid grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="terminosCondiciones">Términos y Condiciones</Label>
                  <Textarea
                    id="terminosCondiciones"
                    value={terminosCondiciones}
                    onChange={(e) => setTerminosCondiciones(e.target.value)}
                    placeholder="N/A o especifique los términos y condiciones aplicables"
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>

              {/* Fila 9: Seguimiento (ancho completo) */}
              <div className="grid grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="seguimiento">Seguimiento</Label>
                  <Textarea
                    id="seguimiento"
                    value={seguimiento}
                    onChange={(e) => setSeguimiento(e.target.value)}
                    placeholder="Registre el seguimiento realizado al asunto, tema o informe"
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 5: ESTATUS */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Estatus del Acuerdo</h4>
              
              {/* Fila 10: Estatus (campo corto) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estatus">Estatus</Label>
                  <NativeSelect 
                    id="estatus"
                    value={estatus} 
                    onChange={(e) => setEstatus(e.target.value)}
                  >
                    <option value="autorizado">Autorizado</option>
                    <option value="aprobado">Aprobado</option>
                    <option value="en-proceso">En Proceso</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="rechazado">Rechazado</option>
                  </NativeSelect>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              {onBack && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Regresar
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="gap-2"
              >
                Limpiar Formulario
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#08546C] to-[#022534] hover:from-[#06445a] hover:to-[#011a24] text-white gap-2 sm:ml-auto"
              >
                <Save className="w-4 h-4" />
                Guardar Acuerdo
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* CustomAlert */}
      <CustomAlert
        type={alert.type}
        title={alert.title}
        message={alert.message}
        open={alert.open}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        onConfirm={alert.onConfirm}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </div>
  );
}