import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, interval, startWith, switchMap, tap } from 'rxjs';
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

  constructor(private http: HttpClient) {
    this.fetchMessagesFromApi();
    const checkInterval$ = interval(5000);

    // Use switchMap to switch to a new observable whenever the timer emits
    checkInterval$
      .pipe(
        startWith(0), // Start with an initial emission to trigger the first API call
        switchMap(() => this.fetchMessagesFromApi())
      )
      .subscribe((messages) => {
        this.messagesSubject.next(messages);
      });
  }

  // Fetch messages from the API and return an observable
  private fetchMessagesFromApi(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  markMessagesAsSeen(messages: Message[]): Observable<Message[]> {
    const messageIds = messages.map((message) => message._id);
    const payload = {
      messageIds: messageIds,
    };
    return this.http.put<Message[]>(this.apiUrl + '/seen', payload).pipe(
      tap(() => {
        this.fetchMessagesFromApi().subscribe((messages) => {
          this.messagesSubject.next(messages);
        });
      }),
      catchError((error) => {
        console.error('Error marking messages as seen:', error);
        throw error;
      })
    );
  }

  getMessages(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(message: Message) {
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
      sendVcf: message.isVcf
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
