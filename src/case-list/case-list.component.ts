import { Component } from '@angular/core';
import { CaseComponent } from '../case/case.component';
import { CaseModel } from '../Models/case-model';
import { CaseService } from '../Services/case.service';
import { NgForOf } from '@angular/common';
import { parseJwt } from '../TokenParsing/jwtParser'; // Assuming you have a JWT parser

@Component({
  selector: 'app-case-list',
  imports: [CaseComponent, NgForOf],
  templateUrl: './case-list.component.html',
  standalone: true,
  styleUrl: './case-list.component.css'
})
export class CaseListComponent {
  cases: CaseModel[] = []; // Array to store the fetched cases

  constructor(private caseService: CaseService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (token) {
      const decodedToken = parseJwt(token); // Decode the JWT payload
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // JWT role claim

      if (role === 'Customer') {
        const customerId = decodedToken['sub']; // Adjust key based on token structure
        this.loadCasesByCustomer(customerId); // Fetch cases filtered by customer ID
      } else if (role === 'Technician') {
        this.loadAllCases(); // Fetch all cases
      } else {
        console.error('Unknown user role. Unable to load cases.');
      }
    } else {
      console.error('No JWT token found. Unable to load cases.');
    }
  }

  // Load cases for customers
  private loadCasesByCustomer(customerId: string) {
    this.caseService.getCasesByCustomer(customerId).subscribe({
      next: (data: CaseModel[]) => {
        console.log('Filtered cases for customer:', data);
        this.cases = data;
      },
      error: (err) => {
        console.error('Error fetching customer cases:', err.message);
      }
    });
  }

  // Load all cases for technicians
  private loadAllCases() {
    this.caseService.getCases().subscribe({
      next: (data: CaseModel[]) => {
        console.log('All cases:', data);
        this.cases = data;
      },
      error: (err) => {
        console.error('Error fetching all cases:', err.message);
      }
    });
  }
}
