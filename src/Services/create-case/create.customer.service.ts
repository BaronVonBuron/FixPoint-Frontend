import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCustomerService {
  private apiUrl = 'http://localhost:5230/api/Customer';

  constructor(private http: HttpClient) { }

  createCustomer(customer: { id: string, name: string, email: string, phonenumber: string, cprcvr: string }): Observable<any> {
    // Optionally, define headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, customer, { headers });
  }
}
