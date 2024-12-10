import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCaseService {
  private apiUrl = 'http://localhost:5230/api/Case';

  constructor(private http: HttpClient) { }

  createCase(caseData: {
    id: string;
    technicianFK: string;
    customerFK: string;
    type: string;
    description: string;
    status: number;
    priority: number;
    createdDate: string;
    expectedDoneDate: string;
    notes: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, caseData, { headers });
  }
}
