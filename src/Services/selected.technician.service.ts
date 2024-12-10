import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {TechnicianModel} from '../Models/technician-model';
import {SelectedCaseService} from './selected.case.service';


@Injectable({
  providedIn: 'root'
})
export class SelectedTechnicianService {

  private apiBaseUrl = 'http://localhost:5230/api/Technician';

  constructor(private http: HttpClient, private selectedCaseService: SelectedCaseService) { }

  getTechnicianById(): Observable<TechnicianModel> {
    const userId = this.selectedCaseService.getCase()?.technicianFK;
    if (!userId) {
      throw new Error('No technician ID found in selected case');
    }
    const url = `${this.apiBaseUrl}/GetTechnicianById?id=${userId}`;
    return this.http.get<TechnicianModel>(url).pipe(
      map(response => ({
        id: response.id,
        email: response.email,
        name: response.name
      })),
      catchError(error => {
        throw new Error('Failed to fetch technician data: ' + error.message);
      })
    );
  }
}
