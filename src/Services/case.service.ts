import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CaseModel } from '../Models/case-model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiBaseUrl = 'http://localhost:5230/api/Case';

  // BehaviorSubject to store the current list of cases
  private caseListSubject = new BehaviorSubject<CaseModel[]>([]);
  caseList$ = this.caseListSubject.asObservable(); // Observable to expose the list outside the service

  constructor(private http: HttpClient) {}

  // Fetch all cases and store them in the BehaviorSubject
  getCases(): Observable<CaseModel[]> {
    return this.http.get<CaseModel[]>(`${this.apiBaseUrl}/GetCases`).pipe(
      tap((cases) => this.caseListSubject.next(cases)) // Update the shared state (BehaviorSubject) whenever cases are fetched
    );
  }

  // Fetch cases by customer ID and store them as needed
  getCasesByCustomer(customerId: string): Observable<CaseModel[]> {
    return this.http.get<CaseModel[]>(`${this.apiBaseUrl}/GetByCustomer?customerId=${customerId}`).pipe(
      tap((cases) => this.caseListSubject.next(cases)) // Update the shared state (BehaviorSubject) as well
    );
  }

  // Add a new case and refresh the case list
  addCase(newCase: CaseModel): Observable<CaseModel> {
    return this.http.post<CaseModel>(`${this.apiBaseUrl}`, newCase).pipe(
      tap((createdCase) => {
        const currentCases = this.caseListSubject.value;
        this.caseListSubject.next([...currentCases, createdCase]); // Add the new case to the shared state
        // After successfully creating a case, refresh the list of cases
        this.getCases().subscribe(); // Optionally fetch the entire case list if needed (existing logic preserved)
      })
    );
  }

  updateCase(updatedCase: CaseModel): Observable<string> {
    const url = `${this.apiBaseUrl}/UpdateCase`;
    return this.http.put<string>(url, updatedCase);
  }

  // Delete a case and refresh the case list
  deleteCase(caseId: string): Observable<{ message: string }> {
    const url = `${this.apiBaseUrl}/DeleteCase?caseId=${caseId}`;
    return this.http.delete<{ message: string }>(url).pipe(
      tap(() => {
        const updatedCases = this.caseListSubject.value.filter(c => c.id !== caseId); // Remove the deleted case from the shared state
        this.caseListSubject.next(updatedCases);
        // After successfully deleting a case, refresh the list of cases
        this.getCases().subscribe(); // Fetch the updated list of cases
      })
    );
  }
}
