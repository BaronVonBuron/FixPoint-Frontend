import { Component } from '@angular/core';
import { CaseComponent } from '../case/case.component';
import { CaseModel } from '../Models/case-model';
import { CaseService } from '../Services/case.service';
import { NgForOf } from '@angular/common';
import {parseJwt} from '../TokenParsing/jwtParser';

@Component({
  selector: 'app-case-list',
  imports: [CaseComponent, NgForOf],
  templateUrl: './case-list.component.html',
  standalone: true,
  styleUrl: './case-list.component.css',
})
export class CaseListComponent {
  cases: CaseModel[] = []; // Array to hold the cases

  constructor(private caseService: CaseService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT from storage
    if (!token) {
      console.error('User is not authenticated. JWT token is missing.');
      return;
    }

    const parsedToken = parseJwt(token); // Decode the JWT
    const userRole = parsedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Role from JWT
    const customerId = parsedToken['sub']; // Use 'sub' for customer ID

    // Determine which cases to load based on the user's role
    if (userRole === 'Customer') {
      // If the role is 'Customer', fetch cases by the customer's ID
      if (customerId) {
        this.caseService.getCasesByCustomer(customerId).subscribe((cases) => {
          this.cases = cases; // Only show the customer's cases
        });
      } else {
        console.error('No customer ID ("sub") found in JWT for user with the role "Customer".');
      }
    } else if (userRole === 'Technician') {
      // If the role is 'Technician', fetch ALL cases
      this.caseService.getCases().subscribe((cases) => {
        this.cases = cases; // Load all cases for technicians
      });
    } else {
      console.error('Unknown user role detected in JWT:', userRole);
    }
  }
}
