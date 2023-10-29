import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged, interval, map, startWith, switchMap } from 'rxjs';
import Message from '../models/message.model';
import ScheduledMessage from '../models/scheduled-message.model';

@Injectable({
    providedIn: 'root'
})
export class ScheduleMessagesService {
    API_URL = 'http://localhost:3000/messages/schedule';

    constructor(private http: HttpClient) { }

    scheduleMessages(receiverIds: number[], messagePayload: Partial<Message>, triggerAt: Date) {
        return this.http.post(this.API_URL, { receiverIds, messagePayload, triggerAt });
    }

    getScheduledMessagesOnInterval$() {
        return interval(500) // emits a value every 5 seconds
            .pipe(
                startWith(0), // starts immediately
                switchMap(() => this.getScheduledMessages()), // switches to new inner observable when source emits, canceling any previous in-flight requests
                map(scheduledMessages => JSON.stringify(scheduledMessages)), // maps the scheduledMessages to a JSON string
                distinctUntilChanged(), // only emits when the current value is different than the last
                map(scheduledMessagesString => JSON.parse(scheduledMessagesString)) // maps the JSON string back to an array of scheduledMessages
            );
    }

    getScheduledMessages() {
        return this.http.get(this.API_URL) as Observable<ScheduledMessage[]>;
    }

}
