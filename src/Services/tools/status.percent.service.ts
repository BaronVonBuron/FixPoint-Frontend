import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusPercentService {
  multiplyStatusBy25(status: number): number {
    return status * 25;
  }

  getStatusMessage(status: number): string {
    switch (status) {
      case 1:
        return "Modtaget";
      case 2:
        return "Under reperation";
      case 3:
        return "Afventer reservedele";
      case 4:
        return "Repareret og klar til afhentning";
      default:
        return "Ukendt status"; // Optionally handling unknown status codes
    }
  }
}
