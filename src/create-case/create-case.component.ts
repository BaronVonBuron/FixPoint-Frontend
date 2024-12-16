import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { DetailsNewComponent } from '../details-new/details-new.component';
import { v4 as uuidv4 } from 'uuid';
import { CreateCustomerService } from '../Services/create-case/create.customer.service';
import { CaseService } from '../Services/case.service'; // Use CaseService here
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-case',
  imports: [
    HeaderComponent, CustomerInfoComponent, DetailsNewComponent,
  ],
  providers: [CreateCustomerService], // Ensure CreateCustomerService is provided
  templateUrl: './create-case.component.html',
  standalone: true,
  styleUrl: './create-case.component.css'
})
export class CreateCaseComponent {
  @ViewChild('customerInfo') customerInfoComponent!: CustomerInfoComponent;
  @ViewChild('detailsNew') detailsNewComponent!: DetailsNewComponent;

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
    createdDate: new Date(),
    expectedDoneDate: '',
    notes: ''
  };

  constructor(
    private createCustomerService: CreateCustomerService,
    private caseService: CaseService, // Inject CaseService
    private router: Router
  ) {}

  validateInputs(): boolean {
    const customerIsValid = !!this.customer.name && !!this.customer.email && !!this.customer.phonenumber && !!this.customer.cprcvr;
    const caseDataIsValid = !!this.caseData.technicianFK && !!this.caseData.type && !!this.caseData.description;

    // Check if customer info is valid
    if (!customerIsValid) {
      window.alert('Alle kundeoplysninger skal være udfyldte for at kunne fortsætte');
      return false;
    }

    // Check if case data is valid (including expectedDoneDate)
    if (!caseDataIsValid) {
      window.alert('Alle sags-felter skal være udfyldte for at kunne fortsætte');
      return false;
    }

    // Validate that expectedDoneDate is set
    if (!this.caseData.expectedDoneDate) {
      window.alert('Afleveringsdato skal være udfyldt for at kunne oprette en sag');
      return false;
    }

    //validate that priority is set
    if (!this.caseData.priority) {
      window.alert('Prioritet skal være udfyldt for at kunne oprette en sag');
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (!this.validateInputs()) {
      return;
    }

    this.customer.id = uuidv4();
    this.caseData.id = uuidv4();

    this.customer.cprcvr = this.customer.cprcvr.replace(/-/g, '');

    // Create the customer first
    this.createCustomerService.createCustomer(this.customer).subscribe({
      next: (customerResponse) => {
        console.log('Customer created successfully:', customerResponse);

        this.caseData.customerFK = customerResponse.id;

        // Create the case
        this.caseService.addCase(this.caseData).subscribe({
          next: () => {
            alert('Sag oprettet');
            this.router.navigate(['/technician-dashboard']);
          },
          error: (err) => alert('Error creating case: ' + err.message)
        });
      },
      error: (err) => alert('Error creating customer: ' + err.message)
    });
  }

  onCancel(): void {
    const confirmCancel = window.confirm('Er du sikker på, at du vil annullere og gå tilbage til dashboardet?');
    if (confirmCancel) {
      this.router.navigate(['/technician-dashboard']); // Navigate to the dashboard
    }
  }
}
