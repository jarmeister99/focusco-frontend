import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged, interval, map, startWith, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Message from '../models/message.model';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    API_URL = environment.API_BASE_URL + '/messages';

    constructor(private http: HttpClient) { }

    exportMessages() {
        return this.http.get(`${this.API_URL}/export`, { responseType: 'blob' });
    }

    getMessagesOnInterval$() {
        return interval(500) // emits a value every 5 seconds
            .pipe(
                startWith(0), // starts immediately
                switchMap(() => this.getMessages()), // switches to new inner observable when source emits, canceling any previous in-flight requests
                map(messages => JSON.stringify(messages)), // maps the messages to a JSON string
                distinctUntilChanged(), // only emits when the current value is different than the last
                map(messagesString => JSON.parse(messagesString)) // maps the JSON string back to an array of messages
            );
    }

    getMessages() {
        return this.http.get(this.API_URL) as Observable<Message[]>;
    }

    sendMessage(messagePayload: Partial<Message>) {
        return this.http.post(this.API_URL, { ...messagePayload });
    }
}
