// import { Role } from '../roles/role.model';
// import { Tags } from '../tags/tag.model';


export interface ProjectModel {
  pid?: string;
  rid?: string;
  name: string;
  description?: string;
  dueDateTime?: string; // Date
  tids?: string[];
  eids?: string[];
  tgids?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
