import { Component } from '@angular/core';
import {SelectedCaseService} from '../Services/selected.case.service';
import {StatusPercentService} from '../Services/tools/status.percent.service';
import {PriorityNamerService} from '../Services/tools/priority.namer.service';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  standalone: true,
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  constructor(private selectedCaseService: SelectedCaseService,
              private statusPercentService: StatusPercentService,
              private priorityNamerService: PriorityNamerService) {}

  public statusText: string = "";

  ngOnInit(): void {
    this.statusText = this.statusPercentService.getStatusMessage(this.selectedCaseService.getCase()?.status ?? 0);
  }
}
