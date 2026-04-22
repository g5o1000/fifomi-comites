// Layer: Infrastructure
// Path: src/infrastructure/users/dtos/user.dto.ts

export interface IUserDTO {
  Id: number;
  Usuario: string;
  APaterno: string;
  AMaterno: string;
  Nombres: string;
  Nombre_Completo: string;
  Correo: string;
  Extension: string;
  Ubicacion: string;
  Area: string;
  Puesto: string;
  Fecha_Alta: string;
  Fecha_Baja: string | null;
  Nuevo: string;
  Administrador: string;
  Activo: string;
  IP_U_Acceso: string;
  Fecha_U_Acceso: string;
  Hora_U_Acceso: string;
  Modulo: string;
  Foto: string;
  Siglas: string;
  Encuesta: string;
}

export interface ILoginRequestDTO {
  Usuario: string;
  Password: string;
}

export interface ILoginResponseDTO {
  token: string;
  user: IUserDTO;
}
