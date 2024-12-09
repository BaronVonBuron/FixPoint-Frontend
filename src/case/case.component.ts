import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CaseModel} from '../Models/case-model';
import {parseJwt} from '../TokenParsing/jwtParser';
import {SelectedCaseService} from '../Services/selected.case.service';


@Component({
  selector: 'app-case',
  imports: [

  ],
  templateUrl: './case.component.html',
  standalone: true,
  styleUrl: './case.component.css'
})
export class CaseComponent {

  @Input() caseData!: CaseModel;
  constructor(private router: Router, private selectedCaseService: SelectedCaseService) { }


  openCase(casee: CaseModel) {
    this.selectedCaseService.setCase(casee);
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = parseJwt(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (role === 'Technician') {
        this.router.navigate(['technician-case-dashboard']);
      } else {
        this.router.navigate(['customer-case-dashboard']);
      }
    } else {
      console.error('No JWT token found in localStorage');
      // Handle the absence of a token appropriately, e.g., redirect to a login page
    }
  }
}
