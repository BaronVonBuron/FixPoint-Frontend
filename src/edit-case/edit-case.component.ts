import { Component } from '@angular/core';
import {CustomerInfoComponent} from '../customer-info/customer-info.component';
import {DetailsNewComponent} from '../details-new/details-new.component';
import {HeaderComponent} from '../header/header.component';
import {DetailsEditComponent} from '../details-edit/details-edit.component';

@Component({
  selector: 'app-edit-case',
  imports: [
    CustomerInfoComponent,
    DetailsNewComponent,
    HeaderComponent,
    DetailsEditComponent
  ],
  templateUrl: './edit-case.component.html',
  standalone: true,
  styleUrl: './edit-case.component.css'
})
export class EditCaseComponent {

}
