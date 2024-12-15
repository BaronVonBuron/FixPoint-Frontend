import { Component } from '@angular/core';
import { CaseComponent } from '../case/case.component';
import { CaseModel } from '../Models/case-model';
import { CaseService } from '../Services/case.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-case-list',
  imports: [CaseComponent, NgForOf],
  templateUrl: './case-list.component.html',
  standalone: true,
  styleUrl: './case-list.component.css'
})
export class CaseListComponent {
  cases: CaseModel[] = []; // Array to store the subscribed case data

  constructor(private caseService: CaseService) {}

  ngOnInit() {
    // Subscribe to the case list observable
    this.caseService.caseList$.subscribe((cases) => {
      this.cases = cases; // Update the local array whenever the service emits new data
    });

    // Optionally, trigger an initial load if no data exists in the BehaviorSubject
    this.caseService.getCases().subscribe();
  }
}
