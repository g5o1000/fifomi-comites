// Layer: Infrastructure
// Path: src/infrastructure/users/mappers/user.mapper.ts

import { IUserDTO } from '../dtos/user.dto';
import { User } from '../../../domain/users/models/user.model';

export class UserMapper {
  public static toDomain(dto: IUserDTO): User {
    return {
      id: dto.Id,
      username: dto.Usuario,
      lastNameFather: dto.APaterno,
      lastNameMother: dto.AMaterno,
      names: dto.Nombres,
      fullName: dto.Nombre_Completo,
      email: dto.Correo,
      extension: dto.Extension,
      location: dto.Ubicacion,
      area: dto.Area,
      position: dto.Puesto,
      createdAt: dto.Fecha_Alta,
      deletedAt: dto.Fecha_Baja,
      isNew: dto.Nuevo === 'S' || dto.Nuevo === '1' || dto.Nuevo === 'true',
      isAdmin: dto.Administrador === 'S' || dto.Administrador === '1' || dto.Administrador === 'true',
      isActive: dto.Activo === 'S' || dto.Activo === '1' || dto.Activo === 'true',
      lastLoginIp: dto.IP_U_Acceso,
      lastLoginDate: dto.Fecha_U_Acceso,
      lastLoginTime: dto.Hora_U_Acceso,
      module: dto.Modulo,
      photoUrl: dto.Foto,
      initials: dto.Siglas,
      hasSurvey: dto.Encuesta === 'S' || dto.Encuesta === '1' || dto.Encuesta === 'true',
    };
  }
}
