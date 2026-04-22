// Layer: Domain
// Path: src/domain/models/IComite.ts

export interface IIntegrante {
  cargo: string;
  nombre: string;
  puesto: string;
  seccion?: string; // Para comités que dividen integrantes e invitados
}

export interface ISesionData {
  numeroSesion: number | string;
  nombreSesion: string;
  tipoSesion: 'Ordinaria' | 'Extraordinaria';
  fecha: string;
  acta: string;
  carpeta: string;
  tieneCarpeta: boolean;
  anexos?: string;
}

export interface IAcuerdoData {
  numeroSesion: number | string;
  nombreSesion: string;
  tipoSesion: 'Ordinaria' | 'Extraordinaria';
  fecha: string;
  resolucion: string;
  tema: string;
  acuerdo: string;
  estatus: string;
}

export interface IComiteData {
  antecedentes: {
    texto: string;
    fuentes: string[];
    tablaCreacion?: {
      titulo: string;
      filas: Array<{ denominacion: string; fecha: string }>;
    };
  };
  lineamientos: {
    contenido: string[];
    fuentes: string[];
  };
  integracion: IIntegrante[] | any;
  funciones?: {
    introduccion?: string;
    articuloTitulo?: string;
    contenido: Array<{ 
      numero: string; 
      texto: string; 
      subelementos?: Array<{ letra: string; texto: string }> 
    } | string>;
    fuentes: string[];
    notaFinal?: string;
  };
  atribuciones?: {
    contenido: Array<{ numero: string; texto: string }>;
    fuentes: string[];
  };
  sesiones: ISesionData[];
  acuerdos: IAcuerdoData[];
}
