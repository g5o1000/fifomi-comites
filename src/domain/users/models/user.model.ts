// Layer: Domain
// Path: src/domain/users/models/user.model.ts

export interface User {
  id: number;
  username: string;
  lastNameFather: string;
  lastNameMother: string;
  names: string;
  fullName: string;
  email: string;
  extension: string;
  location: string;
  area: string;
  position: string;
  createdAt: string;
  deletedAt: string | null;
  isNew: boolean;
  isAdmin: boolean;
  isActive: boolean;
  lastLoginIp: string;
  lastLoginDate: string;
  lastLoginTime: string;
  module: string;
  photoUrl: string;
  initials: string;
  hasSurvey: boolean;
}
