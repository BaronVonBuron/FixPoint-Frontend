import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CustomerModel} from '../Models/customer-model';
import {NgIf} from '@angular/common';
import {CreateCustomerService} from '../Services/create-case/create.customer.service';

@Component({
  selector: 'app-customer-info',
  imports: [FormsModule, NgIf],
  templateUrl: './customer-info.component.html',
  standalone: true,
  styleUrl: './customer-info.component.css'
})
export class CustomerInfoComponent {
  @Input() customer!: CustomerModel; // Input Customer object passed from EditCaseComponent

  constructor(private createCustomerService: CreateCustomerService) {}
}

