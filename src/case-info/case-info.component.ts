import { Component } from '@angular/core';
import {CaseService} from '../Services/case.service';
import {CaseModel} from '../Models/case-model';
import {SelectedCaseService} from '../Services/selected.case.service';
import {SelectedTechnicianService} from '../Services/selected.technician.service';
import {TechnicianModel} from '../Models/technician-model';
import {SelectedCustomerService} from '../Services/selected.customer.service';
import {CustomerModel} from '../Models/customer-model';

@Component({
  selector: 'app-case-info',
  imports: [],
  templateUrl: './case-info.component.html',
  standalone: true,
  styleUrl: './case-info.component.css'
})
export class CaseInfoComponent {
  constructor(private selectedCaseService: SelectedCaseService, private selectedTechnicianService: SelectedTechnicianService,
              private selectedCustomerService: SelectedCustomerService) {}
  public selectedCase: CaseModel | null = null;
  public selectedTechnician: TechnicianModel | null = null;
  public selectedCustomer: CustomerModel | null = null;

  ngOnInit() {
    this.selectedCase = this.selectedCaseService.getCase();
    this.selectedTechnicianService.getTechnicianById().subscribe(technician => {
      this.selectedTechnician = technician;
    });
    this.selectedCustomerService.getCustomerById().subscribe(customer => {
      this.selectedCustomer = customer;
    });
  }
}
