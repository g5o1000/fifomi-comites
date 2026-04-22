import { Usuario, Comite, Acuerdo, Documento, Permiso } from '../types';

// Usuarios de ejemplo
export const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: 'Administrador Sistema',
    email: 'admin@fifomi.gob.mx',
    password: 'admin123',
    rol: 'admin',
    activo: true,
  },
  {
    id: 2,
    nombre: 'Juan Pérez García',
    email: 'juan.perez@fifomi.gob.mx',
    password: 'usuario123',
    rol: 'usuario',
    activo: true,
  },
  {
    id: 3,
    nombre: 'María González López',
    email: 'maria.gonzalez@fifomi.gob.mx',
    password: 'usuario123',
    rol: 'usuario',
    activo: true,
  },
];

// Comités
export const comites: Comite[] = [
  {
    id_comite: 1,
    nombre_comite: 'Comité de Crédito',
    descripcion: 'Comité encargado de la aprobación y seguimiento de créditos',
    fecha_creacion: '2024-01-15',
    activo: true,
  },
  {
    id_comite: 2,
    nombre_comite: 'Comité de Administración',
    descripcion: 'Comité encargado de asuntos administrativos y recursos humanos',
    fecha_creacion: '2024-01-20',
    activo: true,
  },
  {
    id_comite: 3,
    nombre_comite: 'Comité de Auditoría',
    descripcion: 'Comité responsable de la supervisión de auditorías internas y externas',
    fecha_creacion: '2024-02-01',
    activo: true,
  },
  {
    id_comite: 4,
    nombre_comite: 'Comité de Tecnología',
    descripcion: 'Comité para decisiones sobre infraestructura tecnológica',
    fecha_creacion: '2024-02-10',
    activo: true,
  },
];

// Acuerdos
export const acuerdos: Acuerdo[] = [
  {
    id_acuerdo: 1,
    id_comite: 1,
    numero_sesion: 1,
    fecha_sesion: '2024-03-15',
    descripcion_acuerdo: 'Aprobar línea de crédito para proyecto de vivienda social',
    estatus: 'Completado',
    responsable: 'Juan Pérez García',
    fecha_limite: '2024-04-15',
  },
  {
    id_acuerdo: 2,
    id_comite: 1,
    numero_sesion: 1,
    fecha_sesion: '2024-03-15',
    descripcion_acuerdo: 'Revisión de tasas de interés para el segundo trimestre',
    estatus: 'En Proceso',
    responsable: 'María González López',
    fecha_limite: '2024-04-30',
  },
  {
    id_acuerdo: 3,
    id_comite: 2,
    numero_sesion: 1,
    fecha_sesion: '2024-03-20',
    descripcion_acuerdo: 'Autorización de contratación de personal para área de sistemas',
    estatus: 'Pendiente',
    responsable: 'Juan Pérez García',
    fecha_limite: '2024-05-01',
  },
  {
    id_acuerdo: 4,
    id_comite: 1,
    numero_sesion: 2,
    fecha_sesion: '2024-04-15',
    descripcion_acuerdo: 'Evaluación de cartera vencida del primer trimestre',
    estatus: 'En Proceso',
    responsable: 'María González López',
    fecha_limite: '2024-05-15',
  },
  {
    id_acuerdo: 5,
    id_comite: 3,
    numero_sesion: 1,
    fecha_sesion: '2024-04-10',
    descripcion_acuerdo: 'Revisión del informe de auditoría interna Q1 2024',
    estatus: 'Completado',
    responsable: 'Juan Pérez García',
    fecha_limite: '2024-04-30',
  },
];

// Documentos
export const documentos: Documento[] = [
  {
    id_documento: 1,
    id_comite: 1,
    numero_sesion: 1,
    tipo_documento: 'Acta',
    nombre_archivo: 'Acta_Sesion_01_Credito.pdf',
    ruta_archivo: '/documentos/credito/actas/sesion_01.pdf',
    fecha_subida: '2024-03-16',
  },
  {
    id_documento: 2,
    id_comite: 1,
    numero_sesion: 1,
    tipo_documento: 'Carpeta',
    nombre_archivo: 'Carpeta_Evaluacion_Proyectos.pdf',
    ruta_archivo: '/documentos/credito/carpetas/sesion_01_evaluacion.pdf',
    fecha_subida: '2024-03-15',
  },
  {
    id_documento: 3,
    id_comite: 1,
    numero_sesion: 1,
    tipo_documento: 'Anexo',
    nombre_archivo: 'Anexo_A_Tasas_Interes.xlsx',
    ruta_archivo: '/documentos/credito/anexos/sesion_01_tasas.xlsx',
    fecha_subida: '2024-03-15',
  },
  {
    id_documento: 4,
    id_comite: 2,
    numero_sesion: 1,
    tipo_documento: 'Acta',
    nombre_archivo: 'Acta_Sesion_01_Administracion.pdf',
    ruta_archivo: '/documentos/administracion/actas/sesion_01.pdf',
    fecha_subida: '2024-03-21',
  },
  {
    id_documento: 5,
    id_comite: 1,
    numero_sesion: 2,
    tipo_documento: 'Acta',
    nombre_archivo: 'Acta_Sesion_02_Credito.pdf',
    ruta_archivo: '/documentos/credito/actas/sesion_02.pdf',
    fecha_subida: '2024-04-16',
  },
];

// Permisos
export const permisos: Permiso[] = [
  {
    id_permiso: 1,
    id_usuario: 1,
    id_comite: 1,
    puede_leer: true,
    puede_escribir: true,
    puede_eliminar: true,
    fecha_asignacion: '2024-01-15',
  },
  {
    id_permiso: 2,
    id_usuario: 1,
    id_comite: 2,
    puede_leer: true,
    puede_escribir: true,
    puede_eliminar: true,
    fecha_asignacion: '2024-01-20',
  },
  {
    id_permiso: 3,
    id_usuario: 2,
    id_comite: 1,
    puede_leer: true,
    puede_escribir: true,
    puede_eliminar: false,
    fecha_asignacion: '2024-02-01',
  },
  {
    id_permiso: 4,
    id_usuario: 3,
    id_comite: 1,
    puede_leer: true,
    puede_escribir: false,
    puede_eliminar: false,
    fecha_asignacion: '2024-02-05',
  },
  {
    id_permiso: 5,
    id_usuario: 2,
    id_comite: 2,
    puede_leer: true,
    puede_escribir: true,
    puede_eliminar: false,
    fecha_asignacion: '2024-02-10',
  },
];
