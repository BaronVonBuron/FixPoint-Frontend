export interface MessageModel {
  id: string; // Unique identifier for the message (GUID format)
  caseFK: string; // Case foreign key
  technicianFK: string | null; // Technician foreign key (can be null)
  customerFK: string | null; // Customer foreign key (can be null)
  text: string; // Message text
  timeStamp: Date; // Correct property name matches the API response
}
