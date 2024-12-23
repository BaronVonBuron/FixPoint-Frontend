import { Component } from '@angular/core';
import {CaseListComponent} from '../../../case-list/case-list.component';
import {HeaderComponent} from '../../../header/header.component';
import {FilterComponent} from '../../../filter/filter.component';
import {SearchComponent} from '../../../search/search.component';
import {CreateNewCaseComponent} from '../../../create-new-case/create-new-case.component';


@Component({
  selector: 'app-technician-dashboard',
  imports: [
    CaseListComponent, FilterComponent, SearchComponent, CreateNewCaseComponent, HeaderComponent
  ],
  templateUrl: './technician-dashboard.component.html',
  standalone: true,
  styleUrl: './technician-dashboard.component.css'
})
export class TechnicianDashboardComponent {
  selectedFilter: string = 'Alle sager'; // Current filter
  searchQuery: string = ''; // Current search query

  // Handle filter selection change
  onFilterChange(filter: string) {
    this.selectedFilter = filter;
  }

  // Handle search query change
  onSearch(query: string) {
    this.searchQuery = query; // Update the search query
  }
}
