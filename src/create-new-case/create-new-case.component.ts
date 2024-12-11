import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-new-case',
  imports: [
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './create-new-case.component.html',
  standalone: true,
  styleUrl: './create-new-case.component.css'
})
export class CreateNewCaseComponent {

  constructor(private router: Router) {}

  // Method called when "Opret ny sag" is clicked
  onOption1() {
    console.log('Opret ny sag clicked');
    this.router.navigate(['/create-case']);
  }

  // Method called when "Opret ny tekniker" is clicked
  onOption2() {
    console.log('Opret ny tekniker clicked');
    this.router.navigate(['/create-technician']);
  }
}
