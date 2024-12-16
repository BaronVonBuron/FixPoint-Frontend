import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageModel } from '../Models/message-model';
import { MessageService } from '../Services/messages/message.service';
import { MessageComponent } from '../message/message.component';
import {NgClass, NgForOf} from '@angular/common';
import { SelectedCaseService } from '../Services/selected.case.service';

@Component({
  selector: 'app-message-list',
  providers: [MessageService], // Provide the service
  imports: [
    MessageComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './message-list.component.html',
  standalone: true,
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, AfterViewInit {
  messages: MessageModel[] = []; // Holds the list of messages

  @ViewChild('scrollContainer') scrollContainer!: ElementRef; // Reference to the container

  constructor(private messageService: MessageService, private selectedCaseService: SelectedCaseService) {}

  ngOnInit(): void {
    const caseId = this.selectedCaseService.getCase()?.id;
    if (caseId) {
      this.messageService.getMessagesByCase(caseId).subscribe((data) => {
        // Sort messages using "timeStamp" from the backend response
        this.messages = data.sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime());
      });
    }
    this.scrollToBottom(); // Scroll to bottom after messages are loaded
  }

  ngAfterViewInit(): void {
    this.scrollToBottom(); // Ensure the scroll happens after the view is initialized
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      const nativeElement = this.scrollContainer.nativeElement;
      nativeElement.scrollTo({
        top: nativeElement.scrollHeight - nativeElement.clientHeight,
        behavior: 'smooth'
      });
    }
  }
}
