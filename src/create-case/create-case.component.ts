import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerInfoComponent } from '../customer-info/customer-info.component'; // Import CustomerInfo component
import { DetailsNewComponent } from '../details-new/details-new.component'; // Import DetailsNew component
import { v4 as uuidv4 } from 'uuid';
import { CreateCustomerService } from '../Services/create-case/create.customer.service';
import { CreateCaseService } from '../Services/create-case/create.case.service';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-case',
  imports: [
    HeaderComponent, CustomerInfoComponent, DetailsNewComponent, NgIf
  ],
  providers: [CreateCustomerService, CreateCaseService], // Ensure these services are provided
  templateUrl: './create-case.component.html',
  standalone: true,
  styleUrl: './create-case.component.css'
})
export class CreateCaseComponent {
  @ViewChild('customerInfo') customerInfoComponent!: CustomerInfoComponent; // Access customer info component
  @ViewChild('detailsNew') detailsNewComponent!: DetailsNewComponent; // Access details new component

  customer = {
    id: uuidv4(),
    name: '',
    email: '',
    phonenumber: '',
    cprcvr: ''
  };

  caseData = {
    id: uuidv4(),
    technicianFK: '',
    customerFK: '',
    type: '',
    description: '',
    status: 1,
    priority: 0,
    createdDate: new Date().toISOString(),
    expectedDoneDate: '',
    notes: ''
  };

  errorMessage: string | null = null; // Store validation errors

  constructor(
    private createCustomerService: CreateCustomerService,
    private createCaseService: CreateCaseService,
    private router: Router
  ) {}

  validateInputs(): boolean {
    const customerIsValid = !!this.customer.name && !!this.customer.email && !!this.customer.phonenumber && !!this.customer.cprcvr;
    const caseDataIsValid = !!this.caseData.technicianFK && !!this.caseData.type && !!this.caseData.description;

    // If the customer information is invalid
    if (!customerIsValid) {
      window.alert('Alle kundeoplysninger skal være udfyldte for at kunne fortsætte');
      return false;
    }

    // If the case information is invalid
    if (!caseDataIsValid) {
      window.alert('Alle sags-felter skal være udfyldte for at kunne fortsætte');
      return false;
    }

    return true; // Validation passed
  }

  onSubmit(): void {
    if (!this.validateInputs()) {
      return; // If validation fails, stop submission
    }

    this.customer.id = uuidv4(); // Generate new ID for customer
    this.caseData.id = uuidv4(); // Generate new ID for case

    // Create customer
    this.createCustomerService.createCustomer(this.customer).subscribe({
      next: customerResponse => {
        console.log('Customer creation response:', customerResponse);
        // Use the customer's ID for the case
        this.caseData.customerFK = customerResponse.id;

        // Now create the case
        this.createCaseService.createCase(this.caseData).subscribe({
          next: () => alert('Sag oprettet'),
          error: (err) => alert('Error creating case: ' + err.message)
        });
      },
      error: (err) => alert('Error creating customer: ' + err.message)
    });
    this.router.navigate(['/technician-dashboard']);
  }

  onCancel(): void {
    const confirmCancel = window.confirm('Er du sikker på, at du vil annullere og gå tilbage til dashboardet?');
    if (confirmCancel) {
      this.router.navigate(['/technician-dashboard']); // Navigate to the dashboard
    }
  }
}
