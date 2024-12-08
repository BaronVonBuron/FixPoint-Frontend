export interface CaseModel {
    caseID: string,
    technicianFK: string,
    customerFK: string,
    type: string,
    createdDate: Date,
    expectedDoneDate: Date,
    description: string,
    notes: string,
    priority: number,
    status: number
}
