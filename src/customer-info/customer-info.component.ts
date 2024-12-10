import {Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-info',
  imports: [FormsModule],
  templateUrl: './customer-info.component.html',
  standalone: true,
  styleUrl: './customer-info.component.css'
})
export class CustomerInfoComponent {
  @Input() customer!: any;
}
