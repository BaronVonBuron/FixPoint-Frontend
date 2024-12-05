import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {CustomerInfoComponent} from '../customer-info/customer-info.component';
import {DetailsNewComponent} from '../details-new/details-new.component';

@Component({
  selector: 'app-create-case',
  imports: [
    HeaderComponent, CustomerInfoComponent, DetailsNewComponent
  ],
  templateUrl: './create-case.component.html',
  standalone: true,
  styleUrl: './create-case.component.css'
})
export class CreateCaseComponent {

}
