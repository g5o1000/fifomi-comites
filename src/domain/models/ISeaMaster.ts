// Layer: Domain
// Path: src/domain/models/ISeaMaster.ts

export interface ISeaMaster {
  idSea: number;
  proyectoDescripcion?: string | null;
  fecha?: string | null;
  idCatAreas: number;
  area?: string | null;
  titular?: string | null;
  titularCorreo?: string | null;
  idSeaCatTAdquisicion: number;
  tipoAdquisicion?: string | null;
  idSeaCatEstatus: number;
  estatus?: string | null;
  idSeaCatAvance: number;
  porcentaje?: number | null;
  idSeaCatProceso: number;
  orden?: number | null;
  proceso?: string | null;
  idProcesoAdquisicion: number;
  procesoDescripcion?: string | null;
  idSeaCatFormato?: number | null;
  formato?: string | null;
  idFormatoTipo?: number | null;
  formatoTipo?: string | null;
  usuario?: string | null;
  ip?: string | null;
  visible?: boolean | null;
}
