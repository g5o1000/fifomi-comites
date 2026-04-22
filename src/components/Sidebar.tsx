import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAuthStore } from '../presentation/shared/store/auth.store';
import { cn } from '../lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  FileCheck,
  FileText,
  Users,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BarChart3,
  TrendingUp, // Agregado para ítem Estadísticas
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { COMITES } from '../types/routes';
import type { ComiteId, SeccionComite } from '../types/routes';
import backgroundImage from 'figma:asset/8bd421ed2368848b5ec5f29baed484d1a2451211.png';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeComite?: ComiteId;
  activeSeccion?: SeccionComite;
  onComiteNavigation?: (comiteId: ComiteId, seccionId: SeccionComite) => void;
}

export function Sidebar({ 
  activeView, 
  onViewChange, 
  isOpen, 
  onClose, 
  isCollapsed, 
  onToggleCollapse,
  activeComite,
  activeSeccion,
  onComiteNavigation
}: SidebarProps) {
  const usuario = useAuthStore((state) => state.user);
  const isAdmin = usuario?.isAdmin === true;
  
  // Estados para controlar qué menús están expandidos
  const [comitesExpanded, setComitesExpanded] = useState(false);
  const [expandedComites, setExpandedComites] = useState<Set<ComiteId>>(new Set());
  
  // Estado para controlar el popover de Comités cuando está colapsado
  const [showComitesPopover, setShowComitesPopover] = useState(false);
  const [popoverComiteExpanded, setPopoverComiteExpanded] = useState<ComiteId | null>(null);
  
  // Ref para obtener la posición del botón de Comités
  const comitesButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Actualizar posición del popover cuando se muestra
  useEffect(() => {
    if (showComitesPopover && comitesButtonRef.current) {
      const rect = comitesButtonRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.top,
        left: rect.right + 4, // 4px de margen reducido para evitar gap
      });
    }
  }, [showComitesPopover]);

  // Función para manejar el mouse enter con delay
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowComitesPopover(true);
  };

  // Función para manejar el mouse leave con delay
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowComitesPopover(false);
      setPopoverComiteExpanded(null);
    }, 150); // 150ms de delay para permitir movimiento al popover
  };

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Auto-expandir cuando se navega a un comité
  useEffect(() => {
    if (activeView === 'comite' && activeComite) {
      setComitesExpanded(true);
      // Solo expandir el comité activo (comportamiento de acordeón)
      setExpandedComites(new Set([activeComite]));
    } else if (activeView !== 'comite' && activeView !== 'comites') {
      // Colapsar menú de comités cuando navegas fuera de ellos
      setComitesExpanded(false);
      setExpandedComites(new Set());
    }
  }, [activeView, activeComite]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Inicio',
      icon: LayoutDashboard,
      show: true,
    },
    {
      id: 'estadisticas',
      label: 'Estadísticas',
      icon: TrendingUp,
      show: true,
    },
    {
      id: 'reportes',
      label: 'Reportes',
      icon: BarChart3,
      show: true,
    },
    {
      id: 'permisos',
      label: 'Permisos',
      icon: Users,
      show: isAdmin,
    },
  ];

  const handleItemClick = (viewId: string) => {
    onViewChange(viewId);
    onClose();
    // Auto-colapsar comités cuando se navega a otro módulo
    if (viewId !== 'comite') {
      setComitesExpanded(false);
      setExpandedComites(new Set());
    }
  };

  const toggleComites = () => {
    if (isCollapsed) return;
    const newExpanded = !comitesExpanded;
    setComitesExpanded(newExpanded);
    
    // Al expandir comités, cambiar a vista 'comites' para desmarcar "Inicio"
    if (newExpanded) {
      onViewChange('comites');
    }
  };

  const toggleComite = (comiteId: ComiteId) => {
    if (isCollapsed) return;
    const newExpanded = new Set(expandedComites);
    if (newExpanded.has(comiteId)) {
      // Si ya está expandido, lo cerramos
      newExpanded.delete(comiteId);
      // Al colapsar, volver a vista 'comites' para limpiar selección
      onViewChange('comites');
    } else {
      // Si no está expandido, cerramos todos y abrimos solo este
      newExpanded.clear();
      newExpanded.add(comiteId);
      // Al expandir un comité diferente, cambiar a vista 'comites' para desmarcar el anterior
      onViewChange('comites');
    }
    setExpandedComites(newExpanded);
  };

  const handleSeccionClick = (comiteId: ComiteId, seccionId: SeccionComite) => {
    if (onComiteNavigation) {
      onComiteNavigation(comiteId, seccionId);
      onClose();
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-[84px] left-0 h-[calc(100vh-84px)] border-r border-gray-200 transition-all duration-300 z-50 flex flex-col bg-white/60 backdrop-blur-sm overflow-visible',
          isCollapsed ? 'w-16' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Header del sidebar */}
        <div className={cn(
          "flex items-center justify-between border-b border-gray-200 py-4 bg-white/50 backdrop-blur-sm",
          isCollapsed ? "px-3" : "px-4"
        )}>
          {!isCollapsed && (
            <span className="text-gray-900 font-medium">Menú</span>
          )}
          
          {/* Botón de colapsar (solo escritorio) */}
          <div className="hidden lg:block">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Botón cerrar (solo móvil) */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-2">
            {/* Panel de Control */}
            {(() => {
              const item = menuItems[0]; // Panel de Control
              const Icon = item.icon;
              const isActive = activeView === item.id;

              const buttonContent = (
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    'w-full flex items-center rounded-lg transition-colors',
                    isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                    isActive
                      ? 'bg-[#425363] text-white font-medium'
                      : 'text-gray-700 hover:bg-white/50'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );

              return (
                <li key={item.id}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          {buttonContent}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    buttonContent
                  )}
                </li>
              );
            })()}

            {/* Menú de Comités colapsable */}
            <li className="relative">
              {isCollapsed ? (
                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    ref={comitesButtonRef}
                    onClick={() => setShowComitesPopover(!showComitesPopover)}
                    className={cn(
                      'w-full flex items-center justify-center p-3 rounded-lg transition-colors',
                      activeView === 'comite' || activeView === 'comites'
                        ? 'bg-[#425363] text-white font-medium'
                        : 'text-gray-700 hover:bg-white/50'
                    )}
                  >
                    <FolderKanban className="w-5 h-5 flex-shrink-0" />
                  </button>

                  {/* Popover con menú de Comités usando createPortal */}
                  {showComitesPopover && createPortal(
                    <div 
                      ref={popoverRef}
                      className="fixed bg-white border border-gray-300 rounded-lg shadow-xl z-[999] w-72 max-h-[calc(100vh-200px)] overflow-y-auto"
                      style={{
                        top: `${popoverPosition.top}px`,
                        left: `${popoverPosition.left}px`,
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-3">
                        <div className="mb-2 px-3 py-2 bg-[#425363] text-white rounded-lg font-medium">
                          Comités
                        </div>
                        <ul className="space-y-2">
                          {COMITES.map((comite) => {
                            const isComiteExpanded = popoverComiteExpanded === comite.id;
                            const isComiteActive = activeComite === comite.id;

                            return (
                              <li key={comite.id} className="border-b border-gray-200 pb-2 last:border-b-0">
                                {/* Botón del comité */}
                                <button
                                  onClick={() => setPopoverComiteExpanded(
                                    isComiteExpanded ? null : comite.id
                                  )}
                                  className={cn(
                                    'w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 font-semibold',
                                    isComiteActive
                                      ? 'bg-[#90B1E6] text-white shadow-md'
                                      : 'bg-white text-[#0F1B2A] shadow-sm border border-gray-300 hover:bg-gray-50 hover:shadow-md hover:border-gray-400'
                                  )}
                                >
                                  <span className="flex-1 text-left text-sm">{comite.nombreCorto}</span>
                                  <ChevronDown 
                                    className={cn(
                                      "w-4 h-4 transition-transform",
                                      isComiteExpanded && "rotate-180"
                                    )} 
                                  />
                                </button>

                                {/* Subsecciones del comité */}
                                {isComiteExpanded && (
                                  <ul className="mt-2 ml-3 space-y-1 border-l-2 border-gray-200 pl-3">
                                    {comite.secciones.map((seccion) => {
                                      const isSeccionActive = 
                                        activeComite === comite.id && 
                                        activeSeccion === seccion.id;

                                      return (
                                        <li key={seccion.id}>
                                          <button
                                            onClick={() => {
                                              handleSeccionClick(comite.id, seccion.id);
                                              setShowComitesPopover(false);
                                              setPopoverComiteExpanded(null);
                                            }}
                                            className={cn(
                                              'w-full text-left px-3 py-2 rounded-md text-xs transition-all duration-200',
                                              isSeccionActive
                                                ? 'bg-[#6498AF] text-white font-medium shadow-sm'
                                                : 'text-gray-600 hover:bg-[#e8f0f7] hover:text-gray-900 hover:shadow-sm hover:border-l-2 hover:border-[#90B1E6]'
                                            )}
                                          >
                                            {seccion.label}
                                          </button>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
              ) : (
                <>
                  {/* Botón principal de Comités */}
                  <button
                    onClick={toggleComites}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      activeView === 'comite' || activeView === 'comites'
                        ? 'bg-[#425363] text-white font-medium'
                        : 'text-gray-700 hover:bg-white/50'
                    )}
                  >
                    <FolderKanban className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left">Comités</span>
                  </button>

                  {/* Submenú de Comités */}
                  {comitesExpanded && (
                    <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-300 pl-3">
                      {COMITES.map((comite) => {
                        const isComiteExpanded = expandedComites.has(comite.id);
                        const isComiteActive = activeComite === comite.id || isComiteExpanded;

                        return (
                          <li key={comite.id} className="border-b border-gray-200 pb-2 last:border-b-0">
                            {/* Botón del comité */}
                            <button
                              onClick={() => toggleComite(comite.id)}
                              className={cn(
                                'w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 font-semibold',
                                isComiteActive
                                  ? 'bg-[#90B1E6] text-white shadow-md'
                                  : 'bg-white/70 text-[#0F1B2A] shadow-sm border border-gray-300 hover:bg-white/95 hover:shadow-md hover:scale-[1.02] hover:border-gray-400'
                              )}
                            >
                              <span className="flex-1 text-left text-sm">{comite.nombreCorto}</span>
                              <ChevronDown 
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  isComiteExpanded && "rotate-180"
                                )} 
                              />
                            </button>

                            {/* Subsecciones del comité */}
                            {isComiteExpanded && (
                              <ul className="mt-2 ml-3 space-y-1 border-l-2 border-gray-200 pl-3">
                                {comite.secciones.map((seccion) => {
                                  const isSeccionActive = 
                                    activeComite === comite.id && 
                                    activeSeccion === seccion.id;

                                  return (
                                    <li key={seccion.id}>
                                      <button
                                        onClick={() => handleSeccionClick(comite.id, seccion.id)}
                                        className={cn(
                                          'w-full text-left px-3 py-2 rounded-md text-xs transition-all duration-200',
                                          isSeccionActive
                                            ? 'bg-[#6498AF] text-white font-medium shadow-sm'
                                            : 'text-gray-600 hover:bg-[#e8f0f7] hover:text-gray-900 hover:shadow-sm hover:border-l-2 hover:border-[#90B1E6]'
                                        )}
                                      >
                                        {seccion.label}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}
            </li>

            {/* Resto de menú items (Reportes, Permisos) */}
            {menuItems
              .slice(1) // Omitir Inicio (ya lo mostramos arriba)
              .filter((item) => item.show)
              .map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                const buttonContent = (
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      'w-full flex items-center rounded-lg transition-colors',
                      isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                      isActive
                        ? 'bg-[#425363] text-white font-medium'
                        : 'text-gray-700 hover:bg-white/50'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                );

                return (
                  <li key={item.id}>
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {buttonContent}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      buttonContent
                    )}
                  </li>
                );
              })}
          </ul>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
            <div className="text-xs text-gray-500">
              <p>Sistema v1.0</p>
              <p>© 2024 FIFOMI</p>
            </div>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}