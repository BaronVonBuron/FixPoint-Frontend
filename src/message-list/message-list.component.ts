import { Component, OnInit } from '@angular/core';
import {MessageModel} from '../Models/message-model';
import {MessageService} from '../Services/messages/message.service';
import {MessageComponent} from '../message/message.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-message-list',
  providers: [MessageService], // Provide the service
  imports: [
    MessageComponent,
    NgForOf
  ],
  templateUrl: './message-list.component.html',
  standalone: true,
})
export class MessageListComponent implements OnInit {
  messages: MessageModel[] = []; // Holds the list of messages

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    const caseId = '12345'; // Example case FK (You can pass this dynamically)
    this.messageService.getMessagesByCase(caseId).subscribe((data) => {
      this.messages = data;
    });
  }
}
