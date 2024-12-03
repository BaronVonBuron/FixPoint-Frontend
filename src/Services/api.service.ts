import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5230/'; // Replace with your actual API URL
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  // Login method
  login(endpoint: string, credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, credentials);
  }

  // Set token
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('jwtToken', token);
  }

  // Get token
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('jwtToken');
    }
    return this.token;
  }

  // Example method to fetch protected data
  getProtectedData(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers });
  }

  // Logout
  logout(): void {
    this.token = null;
    localStorage.removeItem('jwtToken');
  }
}
