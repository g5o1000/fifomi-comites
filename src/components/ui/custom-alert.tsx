import React from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from './button';

interface CustomAlertProps {
  type: 'error' | 'success' | 'confirm';
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function CustomAlert({
  type,
  title,
  message,
  open,
  onClose,
  onConfirm,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
}: CustomAlertProps) {
  if (!open) return null;

  const getColorClasses = () => {
    switch (type) {
      case 'error':
        return {
          gradient: 'from-red-500 via-red-400 to-red-500',
          iconBg: 'from-red-100 to-red-50',
          iconRing: 'ring-red-50',
          iconColor: 'text-red-600',
          Icon: AlertCircle,
        };
      case 'success':
        return {
          gradient: 'from-green-500 via-green-400 to-green-500',
          iconBg: 'from-green-100 to-green-50',
          iconRing: 'ring-green-50',
          iconColor: 'text-green-600',
          Icon: CheckCircle,
        };
      case 'confirm':
        return {
          gradient: 'from-green-500 via-green-400 to-green-500',
          iconBg: 'from-green-100 to-green-50',
          iconRing: 'ring-green-50',
          iconColor: 'text-green-600',
          Icon: CheckCircle,
        };
    }
  };

  const colors = getColorClasses();
  const Icon = colors.Icon;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4" style={{ pointerEvents: 'auto' }}>
      {/* Backdrop oscuro con blur */}
      <div
        className="absolute inset-0 bg-black/60"
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={(e) => {
          if (type === 'confirm' && e.target === e.currentTarget) {
            onClose();
          }
        }}
      />

      {/* Modal elegante - blanco sólido */}
      <div
        className="relative bg-white max-w-md w-full rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior decorativa con gradiente */}
        <div className={`h-2 bg-gradient-to-r ${colors.gradient} rounded-t-2xl`} />

        {/* Contenido */}
        <div className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${colors.iconBg} ring-4 ${colors.iconRing}`}>
              <Icon className={`w-7 h-7 ${colors.iconColor}`} />
            </div>
            <div className="flex-1 pt-2">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {message}
              </p>
            </div>
          </div>

          {/* Botones */}
          {type === 'confirm' ? (
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Botón Cancelar clickeado');
                  onClose();
                }}
                className="px-6 py-2.5 border-2 hover:bg-gray-50 transition-all duration-200"
                style={{ pointerEvents: 'auto' }}
              >
                {cancelText}
              </Button>
              <Button
                type="button"
                className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8] text-white px-8 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Botón Confirmar y Guardar clickeado');
                  onConfirm?.();
                  onClose();
                }}
                style={{ pointerEvents: 'auto' }}
              >
                {confirmText}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Botón Aceptar clickeado');
                  onConfirm?.();
                  onClose();
                }}
                className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#2868A8] text-white px-8 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ pointerEvents: 'auto' }}
              >
                {confirmText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}