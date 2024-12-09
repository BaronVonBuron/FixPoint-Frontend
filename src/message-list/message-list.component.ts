import { Component } from '@angular/core';
import {MessageComponent} from '../message/message.component';

@Component({
  selector: 'app-message-list',
  imports: [MessageComponent],
  templateUrl: './message-list.component.html',
  standalone: true,
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

}
