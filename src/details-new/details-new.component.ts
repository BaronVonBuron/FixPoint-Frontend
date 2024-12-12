import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetTechniciansService } from '../Services/technician-list/get.technicians.service';
import { TechnicianModel } from '../Models/technician-model';
import { NgForOf } from '@angular/common';
import { ApiService } from '../Services/api.service';
import {parseJwt} from '../TokenParsing/jwtParser'; // Import ApiService to access the token


@Component({
  selector: 'app-details-new',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './details-new.component.html',
  styleUrl: './details-new.component.css'
})
export class DetailsNewComponent implements OnInit {
  @Input() caseData: any; // Input property to bind case data

  technicians: TechnicianModel[] = []; // List of all technicians

  constructor(
    private getTechniciansService: GetTechniciansService,
    private apiService: ApiService // Use ApiService to retrieve the token
  ) {}

  ngOnInit() {
    // Get the JWT token from ApiService
    const token = this.apiService.getToken(); // This retrieves 'jwtToken' from localStorage
    if (token) {
      // Parse the token and extract the 'sub' field (ID of the currently logged-in user)
      const decodedToken = parseJwt(token);
      const loggedInUserId = decodedToken?.['sub']; // Extract 'sub' for the ID

      // Fetch the list of technicians
      this.getTechniciansService.getTechnicians().subscribe(techs => {
        this.technicians = techs;

        // Set the default technician if the logged-in user's ID exists
        if (loggedInUserId) {
          this.caseData.technicianFK = loggedInUserId;
        }
      });
    } else {
      console.error('No JWT token found');
    }
  }
}
