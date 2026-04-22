import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { cn } from '../lib/utils';
import type { ComiteId, SeccionComite } from '../types/routes';
import backgroundImage from 'figma:asset/8bd421ed2368848b5ec5f29baed484d1a2451211.png';

interface MainLayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  activeComite?: ComiteId;
  activeSeccion?: SeccionComite;
  onComiteNavigation?: (comiteId: ComiteId, seccionId: SeccionComite) => void;
}

export function MainLayout({ 
  children, 
  activeView, 
  onViewChange,
  activeComite,
  activeSeccion,
  onComiteNavigation
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigateHome = () => {
    onViewChange('dashboard');
  };

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onNavigateHome={handleNavigateHome}
      />
      
      <div className="flex">
        <Sidebar
          activeView={activeView}
          onViewChange={onViewChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeComite={activeComite}
          activeSeccion={activeSeccion}
          onComiteNavigation={onComiteNavigation}
        />
        
        <main 
          className={cn(
            "flex-1 p-6 lg:p-8 max-w-full overflow-x-clip transition-all duration-300",
            sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}