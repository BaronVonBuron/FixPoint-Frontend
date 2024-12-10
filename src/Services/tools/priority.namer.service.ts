import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityNamerService {

  constructor() { }

  getPriorityName(priority: number): string {
    switch (priority) {
      case 1:
        return "Høj";
      case 2:
        return "Mellem";
      case 3:
        return "Lav";
      default:
        return "Ukendt"; // Optionally handle unknown priorities
    }
  }
}
