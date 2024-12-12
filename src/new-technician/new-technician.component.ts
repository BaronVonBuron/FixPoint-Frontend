import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TechnicianService} from '../Services/technician-services/technician.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-new-technician',
  imports: [
    FormsModule
  ],
  templateUrl: './new-technician.component.html',
  styleUrl: './new-technician.component.css',
  standalone: true,
})
export class NewTechnicianComponent {
  // Properties to bind to form inputs
  name: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private technicianService: TechnicianService, private router: Router) {}

  solve() {
    if (this.password !== this.repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Call the service to add a technician
    this.technicianService.addTechnician(this.name, this.email, this.password)
      .subscribe(
        (response) => {
          alert('Technician created successfully!');
          console.log(response);
          this.router.navigate(['/technician-dashboard']);
        },
        (error) => {
          alert('An error occurred while creating the technician.');
          console.error(error);
        }
      );
  }
}
