import { Component } from '@angular/core';

import {HeaderComponent} from '../../../header/header.component';
import {CaseInfoComponent} from '../../../case-info/case-info.component';
import {ProgressBarComponent} from '../../../progress-bar/progress-bar.component';
import {CaseNotesComponent} from '../../../case-notes/case-notes.component';
import {ContactComponent} from '../../../contact/contact.component';
import {SelectedCaseService} from '../../../Services/selected.case.service';
import {CaseModel} from '../../../Models/case-model';


@Component({
  selector: 'app-technician-case-dashboard',
  imports: [HeaderComponent, CaseInfoComponent, ProgressBarComponent, CaseNotesComponent, ContactComponent],
  templateUrl: './technician-case-dashboard.component.html',
  standalone: true,
  styleUrl: './technician-case-dashboard.component.css'
})
export class TechnicianCaseDashboardComponent {
  public selectedCase: CaseModel | null = null;
  constructor(private selectedCaseService: SelectedCaseService) {

  }
  ngOnInit() {
    this.selectedCase = this.selectedCaseService.getCase();
  }
}
