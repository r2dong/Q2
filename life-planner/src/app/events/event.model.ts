import DateTimeFormat = Intl.DateTimeFormat;

export interface EventModel {
  eid?: string;
  rid?: string; // Role.id;
  name: string; // event name
  pid?: string;
  important?: boolean;
  sdate: string;
  stime?: string;
  edate?: string ;
  etime?: string;
  complete?: boolean;
//  status: boolean; // event status
//  tagIDs?: string[]; // tag_ids
  createdAt?: Date;
  updatedAt?: Date;
}
