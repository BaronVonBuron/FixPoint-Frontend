import {Component, EventEmitter, Output} from '@angular/core';
import { MessageService } from '../Services/messages/message.service';
import { FormsModule } from '@angular/forms';
import { SelectedCaseService } from '../Services/selected.case.service';
import { CaseModel } from '../Models/case-model';
import {parseJwt} from '../TokenParsing/jwtParser';

@Component({
  selector: 'app-send-message',
  providers: [MessageService],
  imports: [FormsModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css',
  standalone: true,
})
export class SendMessageComponent {
  @Output() messageSent: EventEmitter<void> = new EventEmitter(); // Add an output event for parent communication
  messageText: string = ''; // Bound to input field
  selectedCase: CaseModel | null = null;
  userId: string = ''; // Extracted from JWT
  userRole: 'Technician' | 'Customer' = 'Customer'; // Extracted from JWT and default to 'Customer'

  constructor(private messageService: MessageService, private selectedCaseService: SelectedCaseService) {}

  ngOnInit(): void {
    // Parse the JWT and extract the user ID and role when the component initializes
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const parsedToken = parseJwt(token);
      this.userId = parsedToken['sub'] || '';
      this.userRole = parsedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'Customer';
    }
  }

  sendMessage(): void {
    this.selectedCase = this.selectedCaseService.getCase();

    if (!this.messageText.trim() || !this.selectedCase) {
      return;
    }

    const newMessage = {
      id: crypto.randomUUID(),
      text: this.messageText,
      caseFK: this.selectedCase.id,
      technicianFK: this.userRole === 'Technician' ? this.userId : null,
      customerFK: this.userRole === 'Customer' ? this.userId : null,
      timeStamp: new Date(),
    };

    this.messageService.createMessage(newMessage).subscribe(() => {
      this.messageText = '';
      this.messageSent.emit(); // Notify the parent component that a message was successfully sent
    });
  }
}
