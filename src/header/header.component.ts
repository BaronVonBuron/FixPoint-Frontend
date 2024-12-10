import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

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

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  logout() {
    const confirmation = window.confirm('Vil du logge ud?');
    if (confirmation) {
      // Clear the JWT or any stored authentication data
      localStorage.removeItem('jwtToken');

      // Redirect to the login page
      this.router.navigate(['/customer-login']);
    }
  }
}
