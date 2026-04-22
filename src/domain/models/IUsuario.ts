// Layer: Domain
// Path: src/domain/models/IUsuario.ts

export interface IUsuario {
  id: number;
  nombre: string;
  correo: string;
  area?: string | null;
  puesto?: string | null;
  estatus?: string | null;
  rol?: string | null;
}
