import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { BookOpen, Info, Mail, Phone, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface AyudaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AyudaDialog({ open, onOpenChange }: AyudaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7c2539]" />
            Centro de Ayuda
          </DialogTitle>
          <DialogDescription>
            Manual de usuario e información del sistema
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Manual de Usuario */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-blue-900 mb-2">Manual de Usuario</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Consulta la guía completa para el uso del Sistema de Gestión de Comités FIFOMI.
                </p>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="pl-4 border-l-2 border-blue-300">
                    <p className="font-medium">Navegación del Sistema:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                      <li>Utiliza el menú lateral para navegar entre módulos</li>
                      <li>Los breadcrumbs te ayudan a ubicarte en el sistema</li>
                      <li>Cada comité tiene 6 secciones: Antecedentes, Lineamientos, Integración, Atribuciones/Funciones, Sesiones y Acuerdos</li>
                    </ul>
                  </div>
                  <div className="pl-4 border-l-2 border-blue-300 mt-2">
                    <p className="font-medium">Gestión de Comités:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                      <li>Técnico: Supervisión técnica de proyectos</li>
                      <li>Adquisiciones: Gestión de compras y adquisiciones</li>
                      <li>Auditoría: Control interno y auditorías</li>
                      <li>Calidad: Mejora continua y calidad</li>
                    </ul>
                  </div>
                  <div className="pl-4 border-l-2 border-blue-300 mt-2">
                    <p className="font-medium">Funciones Principales:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                      <li>Panel de Control: Vista general de métricas y estadísticas</li>
                      <li>Reportes: Generación de reportes por comité, acuerdos y documentos</li>
                      <li>Permisos: Gestión de roles y accesos (solo administradores)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acerca del Sistema */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-purple-100">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-purple-900 mb-2">Acerca del Sistema</h3>
                <div className="space-y-2 text-sm text-purple-800">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-medium">Versión:</p>
                      <p className="text-xs">1.0.0</p>
                    </div>
                    <div>
                      <p className="font-medium">Última Actualización:</p>
                      <p className="text-xs">Diciembre 2024</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Descripción:</p>
                    <p className="text-xs mt-1">
                      Sistema integral para la gestión y seguimiento de comités institucionales de FIFOMI.
                      Permite administrar sesiones, acuerdos, documentos y generar reportes de cumplimiento.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Tecnologías:</p>
                    <p className="text-xs mt-1">
                      React + TypeScript, Tailwind CSS, shadcn/ui
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Soporte Técnico */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-green-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-green-900 mb-2">Soporte Técnico</h3>
                <p className="text-sm text-green-800 mb-3">
                  ¿Necesitas ayuda adicional? Contacta al equipo de soporte:
                </p>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs">soporte@fifomi.gob.mx</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs">Ext. 1234 - Mesa de Ayuda</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-3">
                  Horario de atención: Lunes a Viernes de 9:00 a 18:00 hrs
                </p>
              </div>
            </div>
          </div>

          {/* Notas Importantes */}
          <div className="border rounded-lg p-4 bg-gradient-to-r from-amber-50 to-amber-100">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-amber-900 mb-2">Notas Importantes</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
                  <li className="text-xs">Guarda tus cambios antes de cambiar de sección</li>
                  <li className="text-xs">Los reportes pueden tardar unos segundos en generarse</li>
                  <li className="text-xs">Revisa los permisos antes de compartir documentos</li>
                  <li className="text-xs">Las referencias numeradas enlazan con fuentes documentales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-[#7c2539] hover:bg-[#6b1f30] text-white"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}