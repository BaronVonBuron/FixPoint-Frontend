import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerLoginComponent} from '../LoginComponents/customer-login/customer-login.component';
import {TechnicianLoginComponent} from "../LoginComponents/technician-login/technician-login.component";
import {CustomerDashboardComponent} from '../Dashboard/MainDash/customer-dashboard/customer-dashboard.component';
import {TechnicianDashboardComponent} from '../Dashboard/MainDash/technician-dashboard/technician-dashboard.component';
import {
  TechnicianCaseDashboardComponent
} from '../Dashboard/CaseDash/technician-case-dashboard/technician-case-dashboard.component';
import {
  CustomerCaseDashboardComponent
} from '../Dashboard/CaseDash/customer-case-dashboard/customer-case-dashboard.component';


export const routes: Routes = [
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'technician-login', component: TechnicianLoginComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'technician-dashboard', component: TechnicianDashboardComponent },
  { path: 'technician-case-dashboard', component: TechnicianCaseDashboardComponent },
  { path: 'customer-case-dashboard', component: CustomerCaseDashboardComponent },
  { path: '', redirectTo: '/customer-login', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
