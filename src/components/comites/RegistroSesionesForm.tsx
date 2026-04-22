import React, { useState } from 'react';
import { ChevronLeft, Save, Calendar as CalendarIcon, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { NativeSelect } from '../ui/native-select';
import { Card, CardContent, CardHeader } from '../ui/card';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CustomCalendar } from '../ui/custom-calendar';

interface RegistroSesionesFormProps {
  comiteNombre: string;
  comiteId: string;
  onBack?: () => void;
  onSave?: (data: any) => void;
  className?: string;
}

export function RegistroSesionesForm({
  comiteNombre,
  comiteId,
  onBack,
  onSave,
  className,
}: RegistroSesionesFormProps) {
  const [formData, setFormData] = useState({
    comite: comiteId,
    tipoSesion: 'Ordinaria',
    numeroSesion: '',
    numeroSesionTexto: '',
    nombreActa: '',
    nombreCarpeta: '',
    incluyeAnexos: 'No',
    actaArchivo: null as File | null,
    carpetaArchivo: null as File | null,
    anexosArchivos: [] as File[],
  });
  const [date, setDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, tipo: 'acta' | 'carpeta' | 'anexos') => {
    const files = e.target.files;
    if (!files) return;

    if (tipo === 'anexos') {
      setFormData({ ...formData, anexosArchivos: Array.from(files) });
    } else if (tipo === 'acta') {
      setFormData({ ...formData, actaArchivo: files[0] });
    } else if (tipo === 'carpeta') {
      setFormData({ ...formData, carpetaArchivo: files[0] });
    }
  };

  const validateForm = (): { isValid: boolean; message: string } => {
    if (!formData.comite) {
      return { isValid: false, message: 'Debe seleccionar un comité.' };
    }
    if (!formData.numeroSesion) {
      return { isValid: false, message: 'Debe ingresar el número de sesión.' };
    }
    if (!formData.numeroSesionTexto) {
      return { isValid: false, message: 'Debe ingresar el número de sesión en texto.' };
    }
    if (!date) {
      return { isValid: false, message: 'Debe seleccionar la fecha de la sesión.' };
    }
    if (!formData.actaArchivo) {
      return { isValid: false, message: 'Debe seleccionar el archivo del acta de la sesión.' };
    }
    if (!formData.nombreActa) {
      return { isValid: false, message: 'Debe ingresar el nombre del acta.' };
    }
    if (!formData.carpetaArchivo) {
      return { isValid: false, message: 'Debe seleccionar el archivo de la carpeta de la sesión.' };
    }
    if (!formData.nombreCarpeta) {
      return { isValid: false, message: 'Debe ingresar el nombre de la carpeta.' };
    }
    if (formData.incluyeAnexos === 'Sí' && formData.anexosArchivos.length === 0) {
      return { isValid: false, message: 'Debe seleccionar al menos un anexo o cambiar "Incluye Anexos" a "No".' };
    }
    return { isValid: true, message: '' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    const validation = validateForm();
    if (!validation.isValid) {
      setErrorMessage(validation.message);
      setShowErrorDialog(true);
      return;
    }

    // Mostrar diálogo de confirmación
    setShowConfirmDialog(true);
  };

  const confirmarGuardado = () => {
    const data = {
      ...formData,
      fecha: date ? format(date, 'yyyy-MM-dd') : '',
    };
    console.log('Guardando sesión:', data);
    if (onSave) {
      onSave(data);
    }
    setShowConfirmDialog(false);
  };

  const handleReset = () => {
    setFormData({
      comite: comiteId,
      tipoSesion: 'Ordinaria',
      numeroSesion: '',
      numeroSesionTexto: '',
      nombreActa: '',
      nombreCarpeta: '',
      incluyeAnexos: 'No',
      actaArchivo: null,
      carpetaArchivo: null,
      anexosArchivos: [],
    });
    setDate(undefined);
  };

  const handleBack = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('handleBack llamado, onBack:', onBack);
    if (onBack) {
      console.log('Ejecutando onBack()');
      onBack();
    } else {
      console.log('No hay onBack, usando window.history.back()');
      // Fallback: volver a la página anterior
      window.history.back();
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 mb-2 font-bold">
            Registro de Sesiones
          </h2>
        </div>
      </div>

      {/* Formulario */}
      <Card className="border-2 border-gray-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#08546C] to-[#022534] text-white py-3">
          <h3 className="text-lg">Captura de Actas y Carpetas del {comiteNombre}</h3>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5 bg-[#F5F8FA] p-6 rounded-lg">
            {/* Primera fila - 2 columnas: Comité y Tipo de Sesión */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Selecciona el Comité */}
              <div className="space-y-2">
                <Label htmlFor="comite">
                  Selecciona el Comité: <span className="text-red-500">*</span>
                </Label>
                <NativeSelect
                  id="comite"
                  value={formData.comite}
                  onChange={(e) => setFormData({ ...formData, comite: e.target.value })}
                  className="bg-[#E8EDF0]"
                >
                  <option value="" disabled>Selecciona un comité</option>
                  <option value="Comité Técnico">Comité Técnico</option>
                  <option value="Comité de Adquisiciones, Arrendamientos y Servicios">
                    Comité de Adquisiciones, Arrendamientos y Servicios
                  </option>
                  <option value="Comité de Auditoría">Comité de Auditoría</option>
                  <option value="Comité de Calidad / Comisión de Calidad">
                    Comité de Calidad / Comisión de Calidad
                  </option>
                </NativeSelect>
              </div>

              {/* Tipo de Sesión */}
              <div className="space-y-2">
                <Label htmlFor="tipoSesion">
                  Tipo de Sesión: <span className="text-red-500">*</span>
                </Label>
                <NativeSelect
                  id="tipoSesion"
                  value={formData.tipoSesion}
                  onChange={(e) => setFormData({ ...formData, tipoSesion: e.target.value })}
                  className="bg-[#E8EDF0]"
                >
                  <option value="Ordinaria">Ordinaria</option>
                  <option value="Extraordinaria">Extraordinaria</option>
                </NativeSelect>
              </div>
            </div>

            {/* Segunda fila - 3 columnas: No. de Sesión (número) + No. de Sesión (texto) + Fecha */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* No. de Sesión (número) */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="numeroSesion">
                  No. de Sesión: <span className="text-red-500">*</span>
                </Label>
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
                  placeholder="0"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[#E8EDF0]"
                />
              </div>

              {/* No. de Sesión (texto largo) */}
              <div className="space-y-2 md:col-span-6">
                <Label htmlFor="numeroSesionTexto">
                  No. de Sesión: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="numeroSesionTexto"
                  type="text"
                  value={formData.numeroSesionTexto}
                  onChange={(e) => setFormData({ ...formData, numeroSesionTexto: e.target.value })}
                  placeholder="NA"
                  className="bg-[#E8EDF0]"
                />
                <p className="text-xs text-gray-500">
                  Ej: Centésima Primera...
                </p>
              </div>

              {/* Fecha de la Sesión */}
              <div className="space-y-2 relative md:col-span-4">
                <Label>
                  Fecha de la Sesión: <span className="text-red-500">*</span>
                </Label>
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full h-10 px-3 rounded-md bg-[#E8EDF0] border border-gray-300 flex items-center justify-between text-left hover:bg-[#dce4e9] transition-colors cursor-pointer"
                >
                  <span className="text-sm">
                    {date ? format(date, 'dd/MM/yyyy', { locale: es }) : ''}
                  </span>
                  <CalendarIcon className="w-5 h-5 text-[#022E5B]" />
                </button>
                {showCalendar && (
                  <div className="absolute z-50 mt-1">
                    <CustomCalendar
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setShowCalendar(false);
                      }}
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Selecciona del Calendario
                </p>
              </div>
            </div>

            {/* Tercera fila - Acta de la Sesión (botón) + Nombre del Acta */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Acta de la Sesión */}
              <div className="space-y-2 md:col-span-5">
                <Label htmlFor="acta">
                  Acta de la Sesión: <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gray-300 bg-white whitespace-nowrap"
                    onClick={() => document.getElementById('acta-file')?.click()}
                  >
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
                  Seleccione el archivo PDF del acta.
                </p>
              </div>

              {/* Nombre del Acta */}
              <div className="space-y-2 md:col-span-7">
                <Label htmlFor="nombreActa">
                  Nombre del Acta: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombreActa"
                  type="text"
                  value={formData.nombreActa}
                  onChange={(e) => setFormData({ ...formData, nombreActa: e.target.value })}
                  placeholder=""
                  className="bg-[#E8EDF0]"
                />
                <p className="text-xs text-gray-500">
                  Ej: Acta 1a Sesin Ordinaria del 2015
                </p>
              </div>
            </div>

            {/* Cuarta fila - Carpeta de la Sesión (botón) + Nombre de la Carpeta */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Carpeta de la Sesión */}
              <div className="space-y-2 md:col-span-5">
                <Label htmlFor="carpeta">
                  Carpeta de la Sesión: <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gray-300 bg-white whitespace-nowrap"
                    onClick={() => document.getElementById('carpeta-file')?.click()}
                  >
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
                  Seleccione el archivo PDF de la carpeta.
                </p>
              </div>

              {/* Nombre de la Carpeta */}
              <div className="space-y-2 md:col-span-7">
                <Label htmlFor="nombreCarpeta">
                  Nombre de la Carpeta: <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombreCarpeta"
                  type="text"
                  value={formData.nombreCarpeta}
                  onChange={(e) => setFormData({ ...formData, nombreCarpeta: e.target.value })}
                  placeholder=""
                  className="bg-[#E8EDF0]"
                />
                <p className="text-xs text-gray-500">
                  Ej: Carpeta 1a Sesión Ordinaria
                </p>
              </div>
            </div>

            {/* Quinta fila - Incluye Anexos + Anexos de la Sesión (condicional) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Incluye Anexos */}
              <div className={cn(
                "space-y-2",
                formData.incluyeAnexos === 'Sí' ? "md:col-span-3" : "md:col-span-12"
              )}>
                <Label>Incluye Anexos:</Label>
                <div className="flex items-center space-x-6 h-10">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="anexos-si"
                      name="incluyeAnexos"
                      value="Sí"
                      checked={formData.incluyeAnexos === 'Sí'}
                      onChange={(e) => setFormData({ ...formData, incluyeAnexos: e.target.value })}
                      className="w-4 h-4 text-[#022E5B] focus:ring-[#022E5B]"
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
                      value="No"
                      checked={formData.incluyeAnexos === 'No'}
                      onChange={(e) => setFormData({ ...formData, incluyeAnexos: e.target.value })}
                      className="w-4 h-4 text-[#022E5B] focus:ring-[#022E5B]"
                    />
                    <Label htmlFor="anexos-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </div>
              </div>

              {/* Anexos de la Sesión - Solo se muestra si "Incluye Anexos" es "Sí" */}
              {formData.incluyeAnexos === 'Sí' && (
                <div className="space-y-2 md:col-span-9">
                  <Label htmlFor="anexos">Anexos de la Sesión:</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-300 bg-white whitespace-nowrap"
                      onClick={() => document.getElementById('anexos-files')?.click()}
                    >
                      Elegir archivos
                    </Button>
                    <span className="text-sm text-gray-600">
                      {formData.anexosArchivos.length > 0
                        ? `${formData.anexosArchivos.length} archivo(s) seleccionado(s)`
                        : 'Ningún archivo seleccionado'}
                    </span>
                    <input
                      id="anexos-files"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      multiple
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
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-300 justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Botón Regresar clickeado, onBack:', onBack);
                  if (onBack) {
                    onBack();
                  }
                }}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#022E5B] transition-colors"
              >
                Regresar
              </button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8] text-white gap-2"
              >
                Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Diálogo de Error */}
      {showErrorDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop oscuro con blur */}
          <div 
            className="absolute inset-0 bg-black/60"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={() => setShowErrorDialog(false)}
          />
          
          {/* Modal elegante - blanco sólido */}
          <div 
            className="relative bg-white max-w-md w-full rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Barra superior decorativa con gradiente */}
            <div className="h-2 bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-t-2xl" />
            
            {/* Contenido */}
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-red-50 ring-4 ring-red-50">
                  <AlertCircle className="w-7 h-7 text-red-600" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Información Incompleta
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  onClick={() => setShowErrorDialog(false)}
                  className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8] text-white px-8 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Entendido
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo de Confirmación */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop oscuro con blur */}
          <div 
            className="absolute inset-0 bg-black/60"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={() => setShowConfirmDialog(false)}
          />
          
          {/* Modal elegante - blanco sólido */}
          <div 
            className="relative bg-white max-w-md w-full rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Barra superior decorativa con gradiente */}
            <div className="h-2 bg-gradient-to-r from-green-500 via-green-400 to-green-500 rounded-t-2xl" />
            
            {/* Contenido */}
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-100 to-green-50 ring-4 ring-green-50">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Confirmar Registro
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    ¿Está seguro que desea registrar la sesión con los datos capturados?
                    <br /><br />
                    Verifique que toda la información sea correcta antes de continuar.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-6 py-2.5 border-2 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8] text-white px-8 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={confirmarGuardado}
                >
                  Confirmar y Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}