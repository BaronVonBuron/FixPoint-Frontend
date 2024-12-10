import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TechnicianModel} from '../../Models/technician-model';

@Injectable({
  providedIn: 'root'
})
export class GetTechniciansService {

  private techniciansUrl = 'http://localhost:5230/api/Technician/GetTechnicians'; // URL to web API

  constructor(private http: HttpClient) { }

  // Method to fetch all technicians
  getTechnicians(): Observable<TechnicianModel[]> {
    return this.http.get<TechnicianModel[]>(this.techniciansUrl);
  }
}
