import React, { useState } from 'react';
import { useAuthStore } from '../presentation/shared/store/auth.store';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut, User, Menu, HelpCircle, BookOpen, Info } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AyudaDialog } from './AyudaDialog';
import logoFifomi from 'figma:asset/27b8f1044c180c89ac378cb4c61cfe7d729ec3b6.png';

interface NavbarProps {
  onToggleSidebar: () => void;
  onNavigateHome?: () => void;
}

export function Navbar({ onToggleSidebar, onNavigateHome }: NavbarProps) {
  const usuario = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const iniciales = usuario?.fullName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  const [isAyudaDialogOpen, setAyudaDialogOpen] = useState(false);

  return (
    <nav className="bg-[#2b4046] border-b border-[#06141f] px-4 py-3 sticky top-0 z-[60] shadow-md relative overflow-hidden">
      {/* Formas decorativas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <svg 
          className="absolute inset-0 w-full h-full" 
          preserveAspectRatio="none"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Capa de fondo principal - tono base */}
          <rect width="1440" height="100" fill="#2b4046" />
          
          {/* Patrón de puntos para algunos cuadros */}
          <defs>
            <pattern id="dots1" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#570017" opacity="0.3" />
            </pattern>
            <pattern id="dots2" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#BA0233" opacity="0.4" />
            </pattern>
          </defs>
          
          {/* Cuadros diagonales - capa de fondo */}
          <g transform="rotate(-15 720 50)">
            {/* Cuadro grande vino oscuro */}
            <rect x="900" y="-50" width="300" height="300" fill="#570017" opacity="0.3" />
            
            {/* Cuadro mediano con puntos */}
            <rect x="1100" y="20" width="200" height="200" fill="url(#dots1)" />
            
            {/* Cuadro rojo/magenta */}
            <rect x="700" y="-20" width="250" height="250" fill="#BA0233" opacity="0.25" />
          </g>
          
          {/* Cuadros diagonales - capa media */}
          <g transform="rotate(-15 720 50)">
            {/* Cuadro con patrón de puntos */}
            <rect x="1050" y="-10" width="180" height="180" fill="url(#dots2)" />
            
            {/* Cuadro vino más visible */}
            <rect x="850" y="30" width="220" height="220" fill="#570017" opacity="0.4" />
            
            {/* Cuadro pequeño rojo intenso */}
            <rect x="1200" y="50" width="150" height="150" fill="#BA0233" opacity="0.35" />
          </g>
          
          {/* Cuadros diagonales - capa frontal */}
          <g transform="rotate(-15 720 50)">
            {/* Cuadro mediano semi-transparente */}
            <rect x="950" y="10" width="160" height="160" fill="#570017" opacity="0.2" />
            
            {/* Cuadro pequeño con puntos */}
            <rect x="1120" y="-30" width="130" height="130" fill="url(#dots1)" opacity="0.8" />
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateHome}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Ir al inicio"
            >
              <img 
                src={logoFifomi} 
                alt="FIFOMI" 
                style={{ height: '72px' }}
                className="w-auto object-contain"
              />
            </button>
            <div className="border-l border-white/30 h-12 mx-2"></div>
            <h1 className="text-white text-xl tracking-wide hidden sm:block">
              Sistema de Gestión de Comités
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm text-white">{usuario?.fullName}</p>
            <p className="text-xs text-white/70 capitalize">{usuario?.position}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                <Avatar>
                  <AvatarFallback className="bg-white/20 text-white">
                    {iniciales}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p>{usuario?.fullName}</p>
                  <p className="text-xs text-gray-500">{usuario?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAyudaDialogOpen(true)}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Ayuda</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <AyudaDialog open={isAyudaDialogOpen} onOpenChange={setAyudaDialogOpen} />
    </nav>
  );
}