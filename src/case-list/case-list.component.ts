import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CaseComponent } from '../case/case.component';
import { CaseModel } from '../Models/case-model';
import { CaseService } from '../Services/case.service';
import { NgForOf } from '@angular/common';
import {parseJwt} from '../TokenParsing/jwtParser';

@Component({
  selector: 'app-case-list',
  imports: [CaseComponent, NgForOf],
  templateUrl: './case-list.component.html',
  standalone: true,
  styleUrl: './case-list.component.css',
})
export class CaseListComponent implements OnChanges {
  @Input() filter!: string; // Receive the selected filter from parent (via Dashboard)
  @Input() searchQuery!: string;
  cases: CaseModel[] = [];
  originalCases: CaseModel[] = []; // All fetched cases (unfiltered)

  constructor(private caseService: CaseService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('User is not authenticated. JWT token is missing.');
      return;
    }

    const parsedToken = parseJwt(token);
    const userRole = parsedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const userId = parsedToken['sub']; // The logged-in user's ID (Customer or Technician)

    // Different fetching behavior for Customer vs. Technician
    if (userRole === 'Customer') {
      // Fetch cases for the current customer only
      if (userId) {
        this.caseService.getCasesByCustomer(userId).subscribe((cases) => {
          this.cases = cases;
          this.originalCases = cases; // Keep the unfiltered base list
        });
      } else {
        console.error('No customer ID ("sub") found in JWT.');
      }
    } else if (userRole === 'Technician') {
      // Fetch all cases for Technician (initially unfiltered)
      this.caseService.getCases().subscribe((cases) => {
        this.cases = cases;
        this.originalCases = cases; // Keep the unfiltered base list
        this.applyFilterAndSearch(); // Ensure the default filter is applied for Technician
      });
    } else {
      console.error('Unknown user role:', userRole);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] || changes['searchQuery']) {
      this.applyFilterAndSearch(); // Reapply the logic when either input changes
    }
  }

  applyFilterAndSearch() {
    let filteredCases = this.originalCases;

    // Step 1: Apply the selected filter (e.g., "Alle sager", "Mine sager")
    const token = localStorage.getItem('jwtToken');
    const userId = token ? parseJwt(token)['sub'] : null;

    if (this.filter === 'Mine sager') {
      filteredCases = filteredCases.filter(c => c.technicianFK === userId);
    } else if (this.filter === 'Afsluttede sager') {
      filteredCases = filteredCases.filter(c => c.status === 1);
    }
    // "Alle sager" applies no filter - keep all cases

    // Step 2: Apply the search query
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase(); // Case-insensitive search
      filteredCases = filteredCases.filter(caseItem =>
        caseItem.id.toLowerCase().includes(query) || // Match by ID
        caseItem.type.toLowerCase().includes(query) || // Match by type
        caseItem.description.toLowerCase().includes(query) // Match by description
      );
    }

    // Step 3: Sort cases
    // For active cases (status 3 or lower): Priority asc, then createdDate asc
    // For completed cases (status = 4): Push to the bottom, createdDate desc
    filteredCases = filteredCases.sort((a, b) => {
      // If one case is completed (status 4) and the other is not, prioritize the non-completed case
      if (a.status === 4 && b.status !== 4) return 1;
      if (b.status === 4 && a.status !== 4) return -1;

      // For completed cases (both statuses are 4): Sort by createdDate desc
      if (a.status === 4 && b.status === 4) {
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(); // Newer first
      }

      // For active cases (status 3 or lower): Sort by priority asc, then createdDate asc
      if (a.priority !== b.priority) {
        return a.priority - b.priority; // Higher priority first (lower number)
      }

      // If priorities are the same, sort by createdDate asc (older first)
      return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
    });

    // Update the displayed cases
    this.cases = filteredCases;
  }
}
