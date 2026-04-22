import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario, AuthContextType } from '../types';
import { usuarios } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    // Verificar si hay sesión guardada
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular autenticación
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password && u.activo
    );

    if (usuarioEncontrado) {
      const { password: _, ...usuarioSinPassword } = usuarioEncontrado;
      setUsuario(usuarioSinPassword as Usuario);
      localStorage.setItem('usuario', JSON.stringify(usuarioSinPassword));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        isAuthenticated: !!usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
