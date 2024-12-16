import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MessageModel} from '../../Models/message-model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = 'http://localhost:5230/api/Message'; // Base API URL

  constructor(private http: HttpClient) {}

  // Fetch all messages for a specific case
  getMessagesByCase(caseId: string): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(`${this.baseUrl}/GetMessagesByCaseId`, {
      params: { caseId }, // Attach the `CaseId` as a query parameter
    });
  }

  // Send a new message
  createMessage(message: MessageModel): Observable<MessageModel> {
    return this.http.post<MessageModel>(this.baseUrl, message);
  }
}
