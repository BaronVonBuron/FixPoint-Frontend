import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {parseJwt} from '../../TokenParsing/jwtParser';


@Component({
  selector: 'app-customer-login',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './customer-login.component.html',
  standalone: true,
  styleUrl: './customer-login.component.css',
})
export class CustomerLoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  solve(): void {
    this.password = this.password.replace(/-/g, '');
    this.apiService.login('login', { username: this.username, password: this.password }).subscribe({
      next: (response: { token: any }) => {
        const token = response.token;

        // Decode the token and validate the role
        const parsedToken = parseJwt(token);
        const userRole = parsedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (userRole !== 'Customer') {
          alert('Adgang nægtet! Kun kunder har adgang her.');
          this.router.navigate(['/technician-login']);
          return;
        }

        // Save the token and redirect
        this.apiService.setToken(token);
        this.router.navigate(['/customer-dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });
  }
}
