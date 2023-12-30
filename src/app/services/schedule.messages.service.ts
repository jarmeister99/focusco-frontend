import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Message from '../models/message.model';
import { CreateScheduledMessageActionPayload } from '../state/scheduledMessages.state';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ScheduleMessagesService {
    API_URL = environment.API_BASE_URL + '/messages/schedule';


    constructor(private http: HttpClient, private authService: AuthService) { }

    scheduleMessage(payload: CreateScheduledMessageActionPayload) {
        return this.http.post(this.API_URL, payload, this.authService.getAuthHeaders());
    }

    getScheduledMessages() {
        return this.http.get(this.API_URL, this.authService.getAuthHeaders()) as Observable<Message[]>;
    }

}
