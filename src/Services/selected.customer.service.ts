import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SelectedCaseService} from './selected.case.service';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CustomerModel} from '../Models/customer-model';

@Injectable({
  providedIn: 'root'
})
export class SelectedCustomerService {

  private apiBaseUrl = 'http://localhost:5230/api/Customer';

  constructor(private http: HttpClient, private selectedCaseService: SelectedCaseService) { }

  getCustomerById(): Observable<CustomerModel> {
    const userId = this.selectedCaseService.getCase()?.customerFK;
    if (!userId) {
      throw new Error('No customer ID found in selected case');
    }
    const url = `${this.apiBaseUrl}/GetCustomerById?id=${userId}`;

    return this.http.get<CustomerModel>(url).pipe(
      map(response => ({
        id: response.id,
        email: response.email,
        name: response.name,
        phonenumber: response.phonenumber,
        cprcvr: response.cprcvr
      })),
      catchError(error => {
        throw new Error('Failed to fetch customer data: ' + error.message);
      })
    );
  }

  getCustomerByIdWithParam(customerId: string): Observable<CustomerModel> {
    if (!customerId) {
      throw new Error('No customer ID provided');
    }
    const url = `${this.apiBaseUrl}/GetCustomerById?id=${customerId}`;

    return this.http.get<CustomerModel>(url).pipe(
      map(response => ({
        id: response.id,
        email: response.email,
        name: response.name,
        phonenumber: response.phonenumber,
        cprcvr: response.cprcvr
      })),
      catchError(error => {
        throw new Error('Failed to fetch customer data: ' + error.message);
      })
    );
  }
}
