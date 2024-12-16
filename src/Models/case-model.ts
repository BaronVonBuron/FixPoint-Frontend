export interface CaseModel {
  id: string,
  technicianFK: string,
  customerFK: string,
  type: string,
  createdDate: Date,
  expectedDoneDate: string | null,
  description: string,
  notes: string,
  priority: number,
  status: number
}
