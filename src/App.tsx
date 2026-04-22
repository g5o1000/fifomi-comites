// Layer: Presentation
// Path: src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useAuthStore } from './presentation/shared/store/auth.store';
import { ProtectedRoute } from './application/guards/ProtectedRoute';
import { Login } from './presentation/modules/Auth/Login';

// Legacy Views & Components
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './components/Dashboard';
import { ComitesView } from './components/ComitesView';
import { AcuerdosView } from './components/AcuerdosView';
import { DocumentosView } from './components/DocumentosView';
import { PermisosView } from './components/PermisosView';
import { ReportesView } from './components/ReportesView';
import { EstadisticasView } from './components/EstadisticasView';
import { DynamicBreadcrumbs, BreadcrumbItem } from './components/DynamicBreadcrumbs';
import { ComiteSeccionCompleta } from './components/comites/ComiteSeccionCompleta';
import { COMITES } from './types/routes';
import type { ComiteId, SeccionComite } from './types/routes';

// IMPORTANT: Suppress known Recharts warnings (internal library bug)
const originalError = console.error.bind(console);
const originalWarn = console.warn.bind(console);

console.error = (...args: any[]) => {
  const errorMessage = args.map(arg => 
    typeof arg === 'string' ? arg : JSON.stringify(arg)
  ).join(' ');
  
  if (errorMessage.includes('Encountered two children with the same key')) {
    return;
  }
  originalError(...args);
};

console.warn = (...args: any[]) => {
  const warnMessage = args.map(arg => 
    typeof arg === 'string' ? arg : JSON.stringify(arg)
  ).join(' ');
  
  if (warnMessage.includes('Encountered two children with the same key')) {
    return;
  }
  originalWarn(...args);
};

// Create a unified QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function LegacyAppContent() {
  // Use new Zustand Store instead of legacy useAuth Context
  const usuario = useAuthStore((state) => state.user);

  const [activeView, setActiveView] = useState<string>('dashboard');
  const [activeComite, setActiveComite] = useState<ComiteId | undefined>(undefined);
  const [activeSeccion, setActiveSeccion] = useState<SeccionComite | undefined>(undefined);
  const [vistaComite, setVistaComite] = useState<'tabla' | 'registro' | 'reportes' | 'estadisticas'>('tabla');
  const [reporteFiltro, setReporteFiltro] = useState<'sesiones' | 'acuerdos' | 'documentos'>('sesiones');
  const [reporteParams, setReporteParams] = useState<{
    comiteIdInicial?: number;
    tipoInicialSesiones?: boolean;
    tipoInicialAcuerdos?: boolean;
    tipoInicialDocumentos?: boolean;
    bloquearComite?: boolean;
    bloquearTipos?: boolean;
  }>({});

  useEffect(() => {
    setVistaComite('tabla');
  }, [activeComite, activeSeccion]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, activeComite, activeSeccion, vistaComite]);

  const handleNavigateToReportes = (filtro: 'sesiones' | 'acuerdos' | 'documentos') => {
    setReporteFiltro(filtro);
    setReporteParams({}); 
    setActiveView('reportes');
  };

  const handleNavigateToReportesConFiltros = (params: {
    comiteId?: number;
    tipoSesiones?: boolean;
    tipoAcuerdos?: boolean;
    tipoDocumentos?: boolean;
  }) => {
    setReporteParams({
      comiteIdInicial: params.comiteId,
      tipoInicialSesiones: params.tipoSesiones ?? false,
      tipoInicialAcuerdos: params.tipoAcuerdos ?? false,
      tipoInicialDocumentos: params.tipoDocumentos ?? false,
      bloquearComite: params.comiteId !== undefined,
      bloquearTipos: true,
    });
    setActiveView('reportes');
  };

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
  };

  const handleComiteNavigation = (comiteId: ComiteId, seccionId: SeccionComite) => {
    setActiveComite(comiteId);
    setActiveSeccion(seccionId);
    setActiveView('comite');
  };

  const handleNavigateToComiteSimple = (comiteId: number, section?: string) => {
    const comiteIdMap: Record<number, ComiteId> = {
      1: 'tecnico',
      2: 'adquisiciones', 
      3: 'auditoria',
      4: 'calidad'
    };

    const mappedComiteId = comiteIdMap[comiteId];
    if (mappedComiteId) {
      const defaultSection = (section || 'antecedentes') as SeccionComite;
      handleComiteNavigation(mappedComiteId, defaultSection);
    }
  };

  const handleViewChange = (view: string) => {
    if (view !== 'comite') {
      setActiveComite(undefined);
      setActiveSeccion(undefined);
    }
    setActiveView(view);
  };

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [];

    breadcrumbs.push({
      label: 'Inicio',
      onClick: () => handleViewChange('dashboard'),
      isActive: activeView === 'dashboard',
    });

    if (activeView === 'reportes') {
      breadcrumbs.push({
        label: 'Reportes',
        isActive: true,
      });
      return breadcrumbs;
    }

    if (['acuerdos', 'documentos', 'permisos'].includes(activeView)) {
      const labels: Record<string, string> = {
        acuerdos: 'Acuerdos',
        documentos: 'Documentos',
        permisos: 'Permisos',
      };
      breadcrumbs.push({
        label: labels[activeView],
        isActive: true,
      });
      return breadcrumbs;
    }

    if (activeView === 'comites') {
      breadcrumbs.push({
        label: 'Comités',
        isActive: true,
      });
      return breadcrumbs;
    }

    if (activeView === 'comite' && activeComite && activeSeccion) {
      const comite = COMITES.find(c => c.id === activeComite);
      if (comite) {
        breadcrumbs.push({
          label: 'Comités',
          onClick: () => handleViewChange('comites'),
        });
        breadcrumbs.push({
          label: comite.nombre,
          onClick: () => {
             setVistaComite('tabla');
          },
        });
        
        const seccion = comite.secciones.find(s => s.id === activeSeccion);
        if (seccion) {
          if (vistaComite === 'estadisticas') {
            breadcrumbs.push({
              label: seccion.label,
              onClick: () => setVistaComite('tabla'),
            });
            breadcrumbs.push({
              label: 'Estadísticas',
              isActive: true,
            });
          } else {
            breadcrumbs.push({
              label: seccion.label,
              isActive: true,
            });
          }
        }
      }
    }

    return breadcrumbs;
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigateToReportes={handleNavigateToReportes} onNavigateToComite={handleNavigateToComiteSimple} />;
      case 'reportes':
        return (
          <ReportesView
            filtroInicial={reporteFiltro}
            onBack={handleBackToDashboard}
            {...reporteParams}
          />
        );
      case 'comites':
        return <ComitesView />;
      case 'comite':
        if (activeComite && activeSeccion) {
          const comite = COMITES.find(c => c.id === activeComite);
          return (
            <ComiteSeccionCompleta
              comiteId={activeComite}
              seccionId={activeSeccion}
              comiteNombre={comite?.nombre || ''}
              onNavigateToReportes={handleNavigateToReportesConFiltros}
              onVistaChange={setVistaComite}
              vistaActiva={vistaComite}
            />
          );
        }
        return <ComitesView />;
      case 'acuerdos':
        return <AcuerdosView />;
      case 'documentos':
        return <DocumentosView />;
      case 'permisos':
        return <PermisosView />;
      case 'estadisticas':
        return (
          <EstadisticasView 
            onBack={handleBackToDashboard}
            comiteInicial={activeComite}
          />
        );
      default:
        return <Dashboard onNavigateToReportes={handleNavigateToReportes} onNavigateToComite={handleNavigateToComiteSimple} />;
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <MainLayout 
      activeView={activeView} 
      onViewChange={handleViewChange}
      activeComite={activeComite}
      activeSeccion={activeSeccion}
      onComiteNavigation={handleComiteNavigation}
    >
      <DynamicBreadcrumbs items={breadcrumbs} />
      {renderView()}
    </MainLayout>
  );
}

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
          
          {/* Protected Area */}
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<LegacyAppContent />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom" /> */}
    </QueryClientProvider>
  );
}