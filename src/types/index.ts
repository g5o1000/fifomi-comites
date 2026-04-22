// Tipos basados en el diagrama de base de datos

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'usuario';
  activo: boolean;
}

export interface Comite {
  id_comite: number;
  nombre_comite: string;
  descripcion: string;
  fecha_creacion: string;
  activo: boolean;
}

export interface Acuerdo {
  id_acuerdo: number;
  id_comite: number;
  numero_sesion: number;
  fecha_sesion: string;
  descripcion_acuerdo: string;
  estatus: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado';
  responsable: string;
  fecha_limite?: string;
}

export interface Documento {
  id_documento: number;
  id_comite: number;
  numero_sesion: number;
  tipo_documento: 'Acta' | 'Carpeta' | 'Anexo';
  nombre_archivo: string;
  ruta_archivo: string;
  fecha_subida: string;
}

export interface Permiso {
  id_permiso: number;
  id_usuario: number;
  id_comite: number;
  puede_leer: boolean;
  puede_escribir: boolean;
  puede_eliminar: boolean;
  fecha_asignacion: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
