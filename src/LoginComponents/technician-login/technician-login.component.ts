import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {parseJwt} from '../../TokenParsing/jwtParser';


@Component({
  selector: 'app-technician-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './technician-login.component.html',
  standalone: true,
  styleUrl: './technician-login.component.css',
})
export class TechnicianLoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  solve(): void {
    this.apiService.login('login', { username: this.username, password: this.password }).subscribe({
      next: (response: { token: any }) => {
        const token = response.token;

        // Decode the token and validate the role
        const parsedToken = parseJwt(token);
        const userRole = parsedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (userRole !== 'Technician') {
          alert('Adgang nægtet! Kun teknikere har adgang her.');
          this.router.navigate(['/customer-login']);
          return;
        }

        // Save the token and redirect
        this.apiService.setToken(token);
        this.router.navigate(['/technician-dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });
  }
}
