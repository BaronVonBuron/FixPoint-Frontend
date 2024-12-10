import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetTechniciansService } from '../Services/technician-list/get.technicians.service';
import { TechnicianModel } from '../Models/technician-model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-details-new',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './details-new.component.html',
  styleUrl: './details-new.component.css'
})
export class DetailsNewComponent implements OnInit {
  @Input() caseData: any;  // Input property for case data

  technicians: TechnicianModel[] = [];

  constructor(private getTechniciansService: GetTechniciansService) {}

  ngOnInit() {
    this.getTechniciansService.getTechnicians().subscribe(techs => {
      this.technicians = techs;
    });
  }
}
