// import { Role } from '../roles/role.model';
// import { Tags } from '../tags/tag.model';



export interface TaskModel {
  tid?: string;
  rid?: string; //Role.id;
  name: string;
//  urgent: boolean;
//  important: boolean;
  dueDateTime?: string; //Date;
//  isComplete: boolean;
//  weight: TaskWeight;
//  tagIDs?: string[];
  createdOn?: Date;
}

export enum TaskWeight {
  EASY,
  MEDIUM,
  HARD,
  SUPERHARD
}
