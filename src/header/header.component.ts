import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {parseJwt} from '../TokenParsing/jwtParser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {
  }


  isDropdownVisible = false;
  notifications = ['Notification 1', 'Notification 2', 'Notification 3', 'Notification 4', 'Notification 5', 'Notification 6', 'Notification 7'];


  logout() {
    const confirmation = window.confirm('Vil du logge ud?');
    if (confirmation) {
      // Clear the JWT or any stored authentication data
      localStorage.removeItem('jwtToken');

      // Redirect to the login page
      this.router.navigate(['/customer-login']);
    }
  }

  backToDashboard() {
      const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
      if (token) {
        const decodedToken = parseJwt(token); // Decode the JWT payload
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // JWT role claim

        if (role === 'Customer') {
          this.router.navigate(['customer-dashboard']);
        } else if (role === 'Technician') {
          this.router.navigate(['technician-dashboard']);
        } else {
          console.error('Unknown user role. Unable to load cases.');
        }
      } else {
        console.error('No JWT token found. Unable to load cases.');
      }
  }
}
