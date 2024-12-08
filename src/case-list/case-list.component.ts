import { Component } from '@angular/core';
import {CaseComponent} from '../case/case.component';
import {CaseModel} from '../Models/case-model';
import {CaseService} from '../Services/case.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-case-list',
  imports: [CaseComponent, NgForOf],
  templateUrl: './case-list.component.html',
  standalone: true,
  styleUrl: './case-list.component.css'
})
export class CaseListComponent {
  cases: CaseModel[] = [];  // Use CaseModel[] for the type

  constructor(private caseService: CaseService) { }

  ngOnInit() {
    this.caseService.getCases().subscribe((data: CaseModel[]) => {
      console.log('Data in component:', data);
      this.cases = data;
    });
  }
}
