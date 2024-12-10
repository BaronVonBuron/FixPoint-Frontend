import { Component } from '@angular/core';
import {SendMessageComponent} from '../send-message/send-message.component';
import {MessageListComponent} from '../message-list/message-list.component';
import {SelectedCaseService} from '../Services/selected.case.service';
import {CaseModel} from '../Models/case-model';

@Component({
  selector: 'app-contact',
  imports: [SendMessageComponent, MessageListComponent],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private selectedCaseService: SelectedCaseService) {}
  private selectedCase: CaseModel | null = null;

  ngOnInit() {
    this.selectedCase = this.selectedCaseService.getCase();
  }

}
