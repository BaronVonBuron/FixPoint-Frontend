import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaseModel } from '../Models/case-model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiBaseUrl = 'http://localhost:5230/api/Case';

  constructor(private http: HttpClient) {}

  // Original method to get all cases
  getCases(): Observable<CaseModel[]> {
    return this.http.get<CaseModel[]>(`${this.apiBaseUrl}/GetCases`);
  }

  // New method to get cases filtered by customer ID
  getCasesByCustomer(customerId: string): Observable<CaseModel[]> {
    return this.http.get<CaseModel[]>(`${this.apiBaseUrl}/GetByCustomer?customerId=${customerId}`);
  }
}
