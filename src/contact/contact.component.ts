import { Component } from '@angular/core';
import {SendMessageComponent} from '../send-message/send-message.component';
import {MessageListComponent} from '../message-list/message-list.component';

@Component({
  selector: 'app-contact',
  imports: [SendMessageComponent, MessageListComponent],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
