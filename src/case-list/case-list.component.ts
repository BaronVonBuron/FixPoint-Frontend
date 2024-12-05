import { Component } from '@angular/core';
import {CaseComponent} from '../case/case.component';

@Component({
  selector: 'app-case-list',
  imports: [CaseComponent],
  templateUrl: './case-list.component.html',
  standalone: true,
  styleUrl: './case-list.component.css'
})
export class CaseListComponent {

}
