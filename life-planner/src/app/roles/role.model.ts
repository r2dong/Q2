// import { Role } from '../roles/role.model';
// import { Tags } from '../tags/tag.model';



export interface RoleModel {
  tid?: string;
  rid?: string; // Role.id;
  name: string;
  pid?: string;
//  urgent: boolean;
//  important: boolean;
  dueDateTime?: string; // Date;
//  isComplete: boolean;
//  weight: RoleWeight;
//  tagIDs?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum RoleWeight {
  EASY,
  MEDIUM,
  HARD,
  SUPERHARD
}
