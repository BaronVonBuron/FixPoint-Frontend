import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ApiService} from "../../Services/api.service";
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-customer-login',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './customer-login.component.html',
  standalone: true,
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(): void {
    this.apiService.login('login', { username: this.username, password: this.password }).subscribe({
      next: (response: { token: any; }) => {
        this.apiService.setToken(response.token); // Save the token
        this.router.navigate(['/customer-dashboard']); // Redirect to the customer page
      },
      error: (errorwer) => {
        alert(errorwer);
        this.errorMessage = 'Invalid credentials';
      }
    });
  }

  solve() {
    console.log(this.username);
    console.log(this.password);
    this.login();
  }
}
