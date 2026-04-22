// Layer: Domain
// Path: src/domain/models/IComiteVotacion.ts

export interface IComiteVotacion {
  id: number;
  idComite?: number | null;
  nombreComite?: string | null;
  anioComite?: string | null;
  noEmpleado?: string | null;
  nombreEmpleado?: string | null;
  nombreVoto?: string | null;
  areaVoto?: string | null;
  puesto?: string | null;
  visible?: string | null;
  buscar?: string | null;
  voto?: string | null;
  fechaCreacion?: string | null;
  ipCreacion?: string | null;
  horaCreacion?: string | null;
}
