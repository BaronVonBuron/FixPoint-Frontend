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
  public arbejder: string = "#eee";
  public reservedele: string = "#eee";
  public klar: string = "#eee";
  public statusPercent?: number = 0;

  ngOnInit(): void {
    this.statusText = this.statusPercentService.getStatusMessage(this.selectedCaseService.getCase()?.status ?? 0);
    this.statusPercent = this.statusPercentService.multiplyStatusBy25(this.selectedCaseService.getCase()?.status ?? 0);
    this.updateStatusColors(this.selectedCaseService.getCase()?.status ?? 0);
  }

  public updateStatusColors(status: number): void {
    const activeColor = "#034c8c";
    const defaultColor = "#eee";

    // Reset all fields to default color
    this.arbejder = defaultColor;
    this.reservedele = defaultColor;
    this.klar = defaultColor;

    // Set colors based on the status
    switch (status) {
      case 2:
        this.arbejder = activeColor;
        break;
      case 3:
        this.arbejder = activeColor;
        this.reservedele = activeColor;
        break;
      case 4:
        this.arbejder = activeColor;
        this.reservedele = activeColor;
        this.klar = activeColor;
        break;
    }
  }
}
