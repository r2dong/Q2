// import { Role } from '../roles/role.model';
// import { Tags } from '../tags/tag.model';


export interface ProjectModel {
  pid?: string;
  rid?: string;
  name: string;
  description?: string;
  dueDateTime?: string; // Date
  tids?: string[];
  // eids:[ {"eid":"string from events"} ];
  // tgids:[ {"tgid":"string from tags"} ];
  createdAt?: Date;
  updatedAt?: Date;
}
