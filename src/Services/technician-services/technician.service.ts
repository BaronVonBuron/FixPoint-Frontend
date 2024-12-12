import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TechnicianModel} from '../../Models/technician-model';


@Injectable({
  providedIn: 'root',
})
export class TechnicianService {
  // Base URL for the API endpoint
  private apiUrl = 'http://localhost:5230/api/Technician';

  constructor(private http: HttpClient) {}

  /**
   * Sends a new technician to the backend to create a technician.
   * @param name The name of the technician
   * @param email The email of the technician
   * @param password The password of the technician
   * @returns Observable<TechnicianModel> with the response from the backend
   */
  addTechnician(
    name: string,
    email: string,
    password: string
  ): Observable<TechnicianModel> {
    const technicianPayload = { name, email, password };
    return this.http.post<TechnicianModel>(this.apiUrl, technicianPayload);
  }
}
