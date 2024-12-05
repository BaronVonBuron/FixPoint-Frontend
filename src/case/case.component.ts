import { Component } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-case',
  imports: [

  ],
  templateUrl: './case.component.html',
  standalone: true,
  styleUrl: './case.component.css'
})
export class CaseComponent {

  constructor(private router: Router) { }
  date: string = '32-13-2025'; //erstat med dato fra databasen
  phoneNumber: string = '12345678'; //erstat med telefonnummer fra databasen
  type: string = 'Type'; //erstat med type fra databasen
  caseID: string = '123456123123123123132'; //erstat med caseID fra databasen
  priority: string = 'Høj'; //erstat med prioritet fra databasen
  status: number = 50; //erstat med status fra databasen

  openCase(caseID: string) {
    this.router.navigate(['technician-case-dashboard']);
  }
}
