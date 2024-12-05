import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ApiService} from "../../Services/api.service";
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-technician-login',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './technician-login.component.html',
  standalone: true,
  styleUrl: './technician-login.component.css'
})
export class TechnicianLoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(): void {
    this.apiService.login('login', { username: this.username, password: this.password }).subscribe({
      next: (response: { token: any; }) => {
        this.apiService.setToken(response.token); // Save the token
        this.router.navigate(['/technician-dashboard']); // Redirect to the dashboard
      },
      error: () => {
        alert('Invalid credentials');
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
  solve() {
    this.login();
  }
}
