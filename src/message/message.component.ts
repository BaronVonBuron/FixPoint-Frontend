import { Component, Input } from '@angular/core';
import {MessageModel} from '../Models/message-model';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-message',
  imports: [
    DatePipe
  ],
  templateUrl: './message.component.html',
  standalone: true,
})
export class MessageComponent {
  @Input() message!: MessageModel; // Accept the message as input
}
