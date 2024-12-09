import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

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
  isDropdownVisible = false;
  notifications = ['Notification 1', 'Notification 2', 'Notification 3', 'Notification 4', 'Notification 5', 'Notification 6', 'Notification 7'];

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
