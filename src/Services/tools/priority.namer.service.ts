import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityNamerService {

  constructor() { }

  // Map number to name
  getPriorityName(priority: number): string {
    const priorityMap = { 1: 'Høj', 2: 'Mellem', 3: 'Lav' };
    return priorityMap[priority as keyof typeof priorityMap] || 'Ukendt';
  }

  // Map name to number
  getPriorityValue(priorityName: string): number {
    const priorityMap = { 'Høj': 1, 'Mellem': 2, 'Lav': 3 };
    return priorityMap[priorityName as keyof typeof priorityMap] || -1;
  }
}
