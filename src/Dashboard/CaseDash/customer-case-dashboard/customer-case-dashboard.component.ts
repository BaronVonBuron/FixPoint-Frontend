import { Component } from '@angular/core';
import {CaseInfoComponent} from '../../../case-info/case-info.component';
import {ProgressBarComponent} from '../../../progress-bar/progress-bar.component';
import {HeaderComponent} from '../../../header/header.component';
import {ContactComponent} from '../../../contact/contact.component';
import {CaseNotesComponent} from '../../../case-notes/case-notes.component';
import {CaseModel} from '../../../Models/case-model';
import {SelectedCaseService} from '../../../Services/selected.case.service';


@Component({
  selector: 'app-customer-case-dashboard',
  imports: [CaseInfoComponent, ProgressBarComponent, HeaderComponent, ContactComponent, CaseNotesComponent],
  templateUrl: './customer-case-dashboard.component.html',
  standalone: true,
  styleUrl: './customer-case-dashboard.component.css'
})
export class CustomerCaseDashboardComponent {
  public selectedCase: CaseModel | null = null;
  constructor(private selectedCaseService: SelectedCaseService) {

  }
  ngOnInit() {
    this.selectedCase = this.selectedCaseService.getCase();
  }
}
