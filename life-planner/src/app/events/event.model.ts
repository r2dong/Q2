export interface EventModel {
  eid?: string; //event id
  rid?: string; // Role.id;
  name: string; // event name
//  important: boolean;
  //sdatetime?: string; // Start Date Time;
  // edatetime?: string//  End Date Time
//  status: boolean; // event status
//  tagIDs?: string[]; // tag_ids
  createdAt?: Date;
  updatedAt?: Date;
}
