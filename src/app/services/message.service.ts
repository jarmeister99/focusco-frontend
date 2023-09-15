import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { SendMessagePayload } from '../library/send-message/send-message.component';
import { Message } from '../models/message.model';
import { Thread } from '../models/thread.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  apiUrl = 'http://localhost:3000/messages';
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<
    Message[]
  >([]);

  contacts: Message[] = [];
  constructor(private http: HttpClient) {
    this.fetchMessagesFromApi();
  }

  private fetchMessagesFromApi(): void {
    this.http.get<Message[]>(this.apiUrl).subscribe((messages) => {
      this.messagesSubject.next(messages);
    });
  }

  getMessages(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(message: Message, messageData?: SendMessagePayload) {
    let threadId;
    if (!(message.thread instanceof Thread)) {
      threadId = message.thread;
    } else {
      threadId = message.thread._id;
    }
    const payload = {
      receiverContactId: message.receiver._id,
      body: message.body,
      threadId: threadId,
      link: message.link,
      sendVcf: messageData?.sendVcf
    };

    return this.http.post<Message>(this.apiUrl, payload).pipe(
      tap((newMessage) => {
        const updatedMessages = [...this.messagesSubject.value, newMessage];
        this.messagesSubject.next(updatedMessages);
      }),
      catchError((error) => {
        console.error('Error sending message:', error);
        throw error;
      })
    );

  }
}
