// Tipos para el sistema de rutas y navegación

export type ComiteId = 'tecnico' | 'adquisiciones' | 'auditoria' | 'calidad';

export type SeccionComite = 
  | 'antecedentes' 
  | 'lineamientos' 
  | 'integracion' 
  | 'atribuciones' 
  | 'funciones' 
  | 'sesiones' 
  | 'acuerdos';

export interface Comite {
  id: ComiteId;
  nombre: string;
  nombreCorto: string;
  secciones: {
    id: SeccionComite;
    label: string;
  }[];
}

export const COMITES: Comite[] = [
  {
    id: 'tecnico',
    nombre: 'Comité Técnico',
    nombreCorto: 'Técnico',
    secciones: [
      { id: 'antecedentes', label: 'Antecedentes' },
      { id: 'lineamientos', label: 'Lineamientos de Operación' },
      { id: 'integracion', label: 'Integración' },
      { id: 'atribuciones', label: 'Atribuciones' },
      { id: 'sesiones', label: 'Sesiones' },
      { id: 'acuerdos', label: 'Acuerdos' },
    ],
  },
  {
    id: 'adquisiciones',
    nombre: 'Comité de Adquisiciones, Arrendamientos y Servicios',
    nombreCorto: 'Adquisiciones',
    secciones: [
      { id: 'antecedentes', label: 'Antecedentes' },
      { id: 'lineamientos', label: 'Lineamientos de Operación' },
      { id: 'integracion', label: 'Integración' },
      { id: 'funciones', label: 'Funciones' },
      { id: 'sesiones', label: 'Sesiones' },
      { id: 'acuerdos', label: 'Acuerdos' },
    ],
  },
  {
    id: 'auditoria',
    nombre: 'Comité de Auditoría',
    nombreCorto: 'Auditoría',
    secciones: [
      { id: 'antecedentes', label: 'Antecedentes' },
      { id: 'lineamientos', label: 'Lineamientos de Operación' },
      { id: 'integracion', label: 'Integración' },
      { id: 'funciones', label: 'Funciones' },
      { id: 'sesiones', label: 'Sesiones' },
      { id: 'acuerdos', label: 'Acuerdos' },
    ],
  },
  {
    id: 'calidad',
    nombre: 'Comité de Calidad - Comisión de Calidad',
    nombreCorto: 'Calidad',
    secciones: [
      { id: 'antecedentes', label: 'Antecedentes' },
      { id: 'lineamientos', label: 'Lineamientos de Operación' },
      { id: 'integracion', label: 'Integración' },
      { id: 'funciones', label: 'Funciones' },
      { id: 'sesiones', label: 'Sesiones' },
      { id: 'acuerdos', label: 'Acuerdos' },
    ],
  },
];

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function getBreadcrumbs(activeView: string, comiteId?: string, seccionId?: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', path: 'dashboard' }
  ];

  if (activeView === 'dashboard') {
    return breadcrumbs;
  }

  if (activeView === 'reportes') {
    breadcrumbs.push({ label: 'Reportes' });
    return breadcrumbs;
  }

  // Vistas simples sin subnavegación
  if (['acuerdos', 'documentos', 'permisos', 'configuracion'].includes(activeView)) {
    const labels: Record<string, string> = {
      acuerdos: 'Acuerdos',
      documentos: 'Documentos',
      permisos: 'Permisos',
      configuracion: 'Configuración',
    };
    breadcrumbs.push({ label: labels[activeView] });
    return breadcrumbs;
  }

  // Navegación de comités
  if (activeView === 'comite' && comiteId && seccionId) {
    const comite = COMITES.find(c => c.id === comiteId);
    if (comite) {
      breadcrumbs.push({ label: 'Comités', path: 'comites' });
      breadcrumbs.push({ label: comite.nombre, path: `comite/${comiteId}` });
      
      const seccion = comite.secciones.find(s => s.id === seccionId);
      if (seccion) {
        breadcrumbs.push({ label: seccion.label });
      }
    }
  } else if (activeView === 'comites') {
    breadcrumbs.push({ label: 'Comités' });
  }

  return breadcrumbs;
}
