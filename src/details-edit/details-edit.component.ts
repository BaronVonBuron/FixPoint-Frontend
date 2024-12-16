import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Also include CommonModule if needed
import { CaseModel } from '../Models/case-model';
import { TechnicianModel } from '../Models/technician-model';
import {PriorityNamerService} from '../Services/tools/priority.namer.service';

@Component({
  selector: 'app-details-edit',
  templateUrl: './details-edit.component.html',
  standalone: true,
  styleUrl: './details-edit.component.css',
  imports: [FormsModule, CommonModule], // Include FormsModule for ngModel support
})
export class DetailsEditComponent {
  @Input() case!: CaseModel; // Case object passed as input
  @Input() technicians: TechnicianModel[] = []; // List of technicians for select dropdown

  constructor(public priorityNamerService: PriorityNamerService) { }
}
