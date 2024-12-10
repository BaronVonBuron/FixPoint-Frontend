import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { DetailsNewComponent } from '../details-new/details-new.component';
import { switchMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import {CreateCustomerService} from '../Services/create-case/create.customer.service';
import {CreateCaseService} from '../Services/create-case/create.case.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-case',
  imports: [
    HeaderComponent, CustomerInfoComponent, DetailsNewComponent
  ],
  providers: [CreateCustomerService, CreateCaseService], // Ensure these services are provided
  templateUrl: './create-case.component.html',
  standalone: true,
  styleUrl: './create-case.component.css'
})
export class CreateCaseComponent {
  customer = {
    id: uuidv4(), // This should be generated or provided
    name: '',
    email: '',
    phonenumber: '',
    cprcvr: ''
  };

  caseData = {
    id: uuidv4(), // This should be generated or provided
    technicianFK: '',
    customerFK: '',
    type: '',
    description: '',
    status: 1, // Assuming enum or similar
    priority: 0,
    createdDate: new Date().toISOString(),
    expectedDoneDate: '',
    notes: ''
  };

  constructor(
    private createCustomerService: CreateCustomerService,
    private createCaseService: CreateCaseService,
    private router: Router
  ) {}

  onSubmit(): void {
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
}
