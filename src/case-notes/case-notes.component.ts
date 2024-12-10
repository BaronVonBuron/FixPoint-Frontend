import { Component } from '@angular/core';
import {CaseModel} from '../Models/case-model';
import {SelectedCaseService} from '../Services/selected.case.service';

@Component({
  selector: 'app-case-notes',
  imports: [],
  templateUrl: './case-notes.component.html',
  standalone: true,
  styleUrl: './case-notes.component.css'
})
export class CaseNotesComponent {
  constructor(private selectedCaseService: SelectedCaseService) {}
  public selectedCase: CaseModel | null = null;

  ngOnInit() {
    this.selectedCase = this.selectedCaseService.getCase();
  }
}
