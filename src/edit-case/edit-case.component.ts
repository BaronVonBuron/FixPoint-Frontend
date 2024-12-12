import { Component, OnInit } from '@angular/core';
import { SelectedCaseService } from '../Services/selected.case.service';
import { CaseModel } from '../Models/case-model';
import { TechnicianModel } from '../Models/technician-model';
import {GetTechniciansService} from '../Services/technician-list/get.technicians.service';
import {NgIf} from '@angular/common';
import {CustomerInfoComponent} from '../customer-info/customer-info.component';
import {DetailsEditComponent} from '../details-edit/details-edit.component';
import {HeaderComponent} from '../header/header.component';
import {CustomerModel} from '../Models/customer-model';
import {SelectedCustomerService} from '../Services/selected.customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  standalone: true,
  imports: [
    NgIf,
    CustomerInfoComponent,
    DetailsEditComponent,
    HeaderComponent
  ],
  styleUrl: './edit-case.component.css'
})
export class EditCaseComponent implements OnInit {
  selectedCase: CaseModel | null = null; // The current case being edited
  customer: any = null;                  // The customer object
  technicians: TechnicianModel[] = [];   // List of all technicians

  constructor(
    private selectedCaseService: SelectedCaseService,
    private getTechniciansService: GetTechniciansService,
    private selectedCustomerService: SelectedCustomerService, // For fetching customer
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch the case data
    this.selectedCase = this.selectedCaseService.getCase();

    // If there's a selected case, fetch the associated customer and technicians
    if (this.selectedCase) {
      // Fetch customer dynamically using customerFK
      this.selectedCustomerService
        .getCustomerByIdWithParam(this.selectedCase.customerFK)
        .subscribe({
          next: (customer: CustomerModel) => {
            this.customer = customer;
            console.log('Customer loaded:', customer);
          },
          error: (err) => {
            console.error('Error fetching customer:', err.message);
          },
        });

      // Fetch technicians for the dropdown
      this.getTechniciansService.getTechnicians().subscribe({
        next: (technicians) => {
          this.technicians = technicians;
          console.log('Technicians loaded:', technicians);
        },
        error: (err) => {
          console.error('Error fetching technicians:', err.message);
        },
      });
    }
  }

  cancel() {
    const confirmCancel = window.confirm('Er du sikker på, at du vil annullere og gå tilbage til dashboardet?');
    if (confirmCancel) {
      this.router.navigate(['/technician-dashboard']); // Navigate to the dashboard
    }
  }
}
