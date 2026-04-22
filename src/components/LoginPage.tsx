import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Building2, Lock, Mail } from 'lucide-react';
import backgroundImage from 'figma:asset/b3f6efd325316afe8a1cbc750fe6784de2f53a8c.png';
import fifomiLogo from 'figma:asset/27b8f1044c180c89ac378cb4c61cfe7d729ec3b6.png';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra superior FIFOMI */}
      <div className="bg-[#2b4046] h-16 flex items-center px-6 shadow-md relative overflow-hidden">
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
              <pattern id="dots1-login" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#570017" opacity="0.3" />
              </pattern>
              <pattern id="dots2-login" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.8" fill="#BA0233" opacity="0.4" />
              </pattern>
            </defs>
            
            {/* Cuadros diagonales - capa de fondo */}
            <g transform="rotate(-15 720 50)">
              {/* Rectángulo grande vino oscuro - alargado */}
              <rect x="200" y="-30" width="180" height="280" rx="12" fill="#570017" opacity="0.35" />
              
              {/* Rectángulo mediano rojo/magenta */}
              <rect x="450" y="0" width="150" height="240" rx="10" fill="#BA0233" opacity="0.3" />
              
              {/* Rectángulo con puntos */}
              <rect x="650" y="-20" width="130" height="220" rx="10" fill="url(#dots1-login)" />
            </g>
            
            {/* Cuadros diagonales - capa media */}
            <g transform="rotate(-15 720 50)">
              {/* Rectángulo vino más visible */}
              <rect x="320" y="10" width="160" height="250" rx="10" fill="#570017" opacity="0.45" />
              
              {/* Rectángulo con patrón de puntos */}
              <rect x="550" y="-10" width="140" height="230" rx="10" fill="url(#dots2-login)" />
              
              {/* Rectángulo pequeño rojo intenso */}
              <rect x="750" y="15" width="120" height="200" rx="8" fill="#BA0233" opacity="0.4" />
            </g>
            
            {/* Cuadros diagonales - capa frontal */}
            <g transform="rotate(-15 720 50)">
              {/* Rectángulo semi-transparente */}
              <rect x="380" y="-5" width="140" height="220" rx="10" fill="#570017" opacity="0.25" />
              
              {/* Rectángulo delgado con puntos */}
              <rect x="600" y="5" width="110" height="190" rx="8" fill="url(#dots1-login)" opacity="0.7" />
            </g>
          </svg>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <img 
            src={fifomiLogo} 
            alt="FIFOMI Logo" 
            style={{ height: '72px' }}
            className="w-auto object-contain"
          />
          <div className="border-l border-white/30 h-12 mx-2"></div>
          <h1 className="text-white text-xl tracking-wide">
            Sistema de Gestión de Comités
          </h1>
        </div>
      </div>

      {/* Contenido principal con imagen de fondo */}
      <div 
        className="flex-1 flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Card de Login con efecto Liquid Glass iOS 18 */}
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              boxShadow: `
                inset 0 -2px 6px 0 rgba(255, 255, 255, 0),
                0 4px 12px 0 rgba(0, 0, 0, 0.1)
              `
            }}
          >
            <div className="p-8">
              <div className="mb-6 text-center">
                <h2 className="text-gray-800 mb-2 font-bold">Iniciar Sesión</h2>
                <p className="text-gray-600 text-sm">
                  Ingresa tus credenciales para acceder al sistema
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="usuario@fifomi.gob.mx"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/50 backdrop-blur-sm border-white/80 text-gray-800 placeholder:text-gray-500 focus:bg-white/70 focus:border-[#08546C]/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white/50 backdrop-blur-sm border-white/80 text-gray-800 placeholder:text-gray-500 focus:bg-white/70 focus:border-[#08546C]/50"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#08546C] to-[#022534] hover:from-[#06445a] hover:to-[#011a24] text-white shadow-lg transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>

              {/* Credenciales de prueba */}
              <div className="mt-6 p-4 bg-blue-50/60 backdrop-blur-sm rounded-lg border border-blue-200/60">
                <p className="text-sm text-blue-900 mb-2">Credenciales de prueba:</p>
                <div className="text-xs text-blue-800 space-y-1">
                  <p><strong>Admin:</strong> admin@fifomi.gob.mx / admin123</p>
                  <p><strong>Usuario:</strong> juan.perez@fifomi.gob.mx / usuario123</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            © 2024 FIFOMI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}