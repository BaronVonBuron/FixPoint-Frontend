import { Component } from '@angular/core';
import {HeaderComponent} from '../../../header/header.component';
import {CaseListComponent} from '../../../case-list/case-list.component';


@Component({
  selector: 'app-customer-dashboard',
  imports: [
    HeaderComponent,
    CaseListComponent
  ],
  templateUrl: './customer-dashboard.component.html',
  standalone: true,
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

}
