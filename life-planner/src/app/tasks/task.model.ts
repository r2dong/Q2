// import { Role } from '../roles/role.model';
// import { Tags } from '../tags/tag.model';

export interface TaskModel {
  tid?: string;
  rid?: string; // Role.id;
  name: string;
  pid?: string;
//  urgent: boolean;
//  important: boolean;
  dueDateTime?: string; // Date;
//  isComplete: boolean;
  weight?: TaskWeight;
//  tagIDs?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TaskWeight {
  NONE = <any>'NONE',
  EASY = <any>'EASY',
  MEDIUM = <any>'MEDIUM',
  HARD = <any>'HARD',
  SUPERHARD = <any>'SUPERHARD'
}

export namespace TaskWeight {
/*
  export function keys() {
    return Object.keys(TaskWeight).filter(
      (type) => isNaN(<any>type) && type !== 'keys'
    );
  }
*/
  export function values() {
    return Object.keys(TaskWeight).filter(
      (type) => isNaN(<any>type) && type !== 'values' && type !== 'defaultVal'
    );
  }
}
