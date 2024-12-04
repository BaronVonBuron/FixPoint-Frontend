import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerLoginComponent} from '../LoginComponents/customer-login/customer-login.component';
import {TechnicianLoginComponent} from "../LoginComponents/technician-login/technician-login.component";
import {CustomerDashboardComponent} from '../Dashboard/MainDash/customer-dashboard/customer-dashboard.component';


export const routes: Routes = [
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'technician-login', component: TechnicianLoginComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: '', redirectTo: '/customer-login', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
