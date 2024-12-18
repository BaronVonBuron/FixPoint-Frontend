import { Component, OnInit } from '@angular/core';
import { SelectedCaseService } from '../Services/selected.case.service';
import { CaseModel } from '../Models/case-model';
import { TechnicianModel } from '../Models/technician-model';
import {GetTechniciansService} from '../Services/technician-list/get.technicians.service';
import {NgIf} from '@angular/common';
import {CustomerInfoComponent} from '../customer-info/customer-info.component';
import {DetailsEditComponent} from '../details-edit/details-edit.component';
import {HeaderComponent} from '../header/header.component';
import {CustomerModel} from '../Models/customer-model';
import {SelectedCustomerService} from '../Services/selected.customer.service';
import {Router} from '@angular/router';
import {CaseService} from '../Services/case.service';
import {PriorityNamerService} from '../Services/tools/priority.namer.service';
import {CreateCustomerService} from '../Services/create-case/create.customer.service';
import {MessageModel} from '../Models/message-model';
import {MessageService} from '../Services/messages/message.service';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  standalone: true,
  imports: [
    NgIf,
    CustomerInfoComponent,
    DetailsEditComponent,
    HeaderComponent
  ],
  styleUrl: './edit-case.component.css'
})
export class EditCaseComponent implements OnInit {
  selectedCase: CaseModel | null = null; // The current case being edited
  customer: any = null;
  technicians: TechnicianModel[] = [];
  priorityOptions: number[] = []; // Priority drop-down options (Lav, Mellem, Høj)

  constructor(
    private selectedCaseService: SelectedCaseService,
    private getTechniciansService: GetTechniciansService,
    private selectedCustomerService: SelectedCustomerService,
    private caseService: CaseService,
    private priorityNamerService: PriorityNamerService,
    private router: Router,
    private createCustomerService: CreateCustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.priorityOptions = [1, 2, 3]; // Priority options as numbers

    this.selectedCase = this.selectedCaseService.getCase();

    if (this.selectedCase) {
      // Ensure the case's expectedDoneDate is in ISO format
      this.selectedCase.expectedDoneDate = this.formatDateAsIso(this.selectedCase.expectedDoneDate);

      // Fetch customer and technicians data
      this.selectedCustomerService.getCustomerByIdWithParam(this.selectedCase.customerFK).subscribe({
        next: (customer) => { this.customer = customer; },
        error: (err) => { console.error('Error fetching customer:', err); },
      });

      this.getTechniciansService.getTechnicians().subscribe({
        next: (technicians) => { this.technicians = technicians; },
        error: (err) => { console.error('Error fetching technicians:', err); },
      });
    }
  }

// Helper function to format a date as an ISO string (yyyy-MM-dd)
  private formatDateAsIso(date: any): string | null {
    if (!date) return null; // Handle null or empty dates
    const parsedDate = new Date(date); // Parse into a Date object
    return parsedDate.toISOString().slice(0, 10); // Extract yyyy-MM-dd
  }

  cancel() {
    const confirmCancel = window.confirm('Er du sikker på, at du vil annullere og gå tilbage til dashboardet?');
    if (confirmCancel) {
      this.router.navigate(['/technician-dashboard']); // Navigate to the dashboard
    }
  }

  Delete() {
    if (!this.selectedCase) {
      console.error("No case selected for deletion.");
      return;
    }

    // Confirmation dialog
    const confirmDelete = window.confirm("Er du sikker? Dette sletter sagen permanent");

    if (confirmDelete) {
      // Call deleteCase and handle response
      this.caseService.deleteCase(this.selectedCase.id).subscribe({
        next: (response) => {
          alert(response.message); // Display the success message from the server
          this.router.navigate(['/technician-dashboard']); // Redirect to dashboard
        },
        error: (err) => {
          console.error('Error while deleting the case:', err);
          alert('Der opstod en fejl under sletning af sagen.');
        },
      });
    }
  }

  Save() {
    if (!this.selectedCase) {
      console.error("No case selected for saving.");
      return;
    }

    if (this.selectedCase.description.length > 999 || this.selectedCase.notes.length > 1999) {
      alert("Beskrivelsen må maksimalt være 1000 tegn og noterne 2000 tegn.");
      return;
    }

    if (this.selectedCase.priority == null || this.selectedCase.priority <= 0 || this.selectedCase.priority >= 4) {
      console.error("Invalid priority:", this.selectedCase.priority);
      alert("Der er en fejl i prioriteten. Tjek den og prøv igen."); // Error message
      return;
    }

    // First, save the customer info
    this.createCustomerService.updateCustomer(this.customer).subscribe({
      next: (response) => {
        console.log('Customer updated successfully:', response);

        // Then, save the case
        this.caseService.updateCase(this.selectedCase!).subscribe({ // Non-null assertion here
          next: (response) => {
            alert('Sagen er opdateret'); // Notify user of success
            this.sendStatusChangeMessage();
            this.router.navigate(['/technician-dashboard']); // Redirect to dashboard
          },
          error: (err) => {
            console.error("Error while saving the case:", err);
            alert("Der opstod en fejl under gemning af sagen.");
          },
        });
      },
      error: (err) => {
        console.error('Error while updating customer:', err);
        alert('Der opstod en fejl under ajourføring af kundeinformationerne.');
      },
    });
  }

  sendStatusChangeMessage(): void {
    if (!this.selectedCase) {
      console.error('Cannot send a message as no case is selected.');
      return;
    }

    let messageText = '';

    const caseStatus = Number(this.selectedCase.status);

    if (isNaN(caseStatus)) {
      console.error('Error: Invalid status value', this.selectedCase.status);
      return; // Exit the method to avoid further issues
    }

    switch (caseStatus) {
      case 1:
        messageText = 'Status: Sagen er modtaget';
        break;
      case 2:
        messageText = 'Status: Sagen er nu under reparation';
        break;
      case 3:
        messageText = 'Status: Sagen afventer reservedele';
        break;
      case 4:
        messageText = 'Status: Sagen er repareret og klar til afhentning';
        break;
      default:
        console.error('Error: Unknown status:', caseStatus);
        return; // Exit if the status is not valid
    }

    const message: MessageModel = {
      id: crypto.randomUUID(),
      caseFK: this.selectedCase.id,
      technicianFK: this.selectedCase.technicianFK,
      customerFK: null,
      text: messageText,
      timeStamp: new Date(),
    };

    this.messageService.createMessage(message).subscribe({
      next: () => console.log('Status change message sent successfully.'),
      error: (err) => console.error('Failed to send status change message:', err),
    });
  }
}
