import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  standalone: true,
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery: string = ''; // Holds the current search term

  @Output() searchEvent = new EventEmitter<string>(); // Emits the search term

  // Emit the current search query when the user clicks the search button
  onSearch() {
    this.searchEvent.emit(this.searchQuery.trim()); // Emit trimmed search term
  }
}
