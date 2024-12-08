import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {CaseModel} from '../Models/case-model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  private apiUrl = 'http://localhost:5230/api/Case/GetCases';

  constructor(private http: HttpClient) { }

  getCases(): Observable<CaseModel[]> {
    return this.http.get<CaseModel[]>(this.apiUrl).pipe(
      tap(data => console.log('Cases received:', data))
    );
  }
}
