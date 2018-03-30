export interface EventModel {
  eid?: string; //event id
  rid?: string; // Role.id;
  name: string; // event name
//  important: boolean;
  sdate: string; // Start Date;
  stime?: string; //Start Time;
  edate?: string;// End Date;
  etime?: string;// End Time;

//  status: boolean; // event status
//  tagIDs?: string[]; // tag_ids
  createdAt?: Date;
  updatedAt?: Date;
}
