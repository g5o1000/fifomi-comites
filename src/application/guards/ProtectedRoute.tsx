// Layer: Application
// Path: src/application/guards/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../presentation/shared/store/auth.store';

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
