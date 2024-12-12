import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Add NgForm for validation
import { CaseService } from '../Services/case.service';
import { SelectedCaseService } from '../Services/selected.case.service';
import { SelectedTechnicianService } from '../Services/selected.technician.service';
import { TechnicianModel } from '../Models/technician-model';
import { SelectedCustomerService } from '../Services/selected.customer.service';
import { CustomerModel } from '../Models/customer-model';
import { CaseModel } from '../Models/case-model';

@Component({
  selector: 'app-case-info',
  imports: [],
  templateUrl: './case-info.component.html',
  standalone: true,
  styleUrl: './case-info.component.css'
})
export class CaseInfoComponent {
  public selectedCase: CaseModel | null = null;
  public selectedTechnician: TechnicianModel | null = null;
  public selectedCustomer: CustomerModel | null = null;
  public errorMessage: string | null = null; // To store the error messages

  constructor(
    private selectedCaseService: SelectedCaseService,
    private selectedTechnicianService: SelectedTechnicianService,
    private selectedCustomerService: SelectedCustomerService
  ) {}

  ngOnInit() {
    this.selectedCase = this.selectedCaseService.getCase();
    this.selectedTechnicianService.getTechnicianById().subscribe(technician => {
      this.selectedTechnician = technician;
    });
    this.selectedCustomerService.getCustomerById().subscribe(customer => {
      this.selectedCustomer = customer;
    });
  }

  // Method to handle form submission and ensure all required fields are filled
  onSubmit(caseForm: NgForm) {
    // Check if the form is valid
    if (caseForm.invalid) {
      this.errorMessage = 'Please fill out all required fields before submitting.';
      return;
    }

    // If valid, proceed with case creation
    this.errorMessage = null;
    console.log('Form Submitted!', this.selectedCase);
  }
}
