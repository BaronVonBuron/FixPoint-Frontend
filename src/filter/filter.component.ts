import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  standalone: true,
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<string>(); // Emits when a filter is selected

  // Method to emit selected filter value
  onFilterChange(selectedValue: string) {
    this.filterChange.emit(selectedValue); // E.g., "Alle sager", "Mine sager", "Afsluttede sager"
  }
}
