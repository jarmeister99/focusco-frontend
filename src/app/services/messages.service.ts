import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Message from '../models/message.model';
import { EditScheduledMessageActionPayload } from '../state/scheduledMessages.state';
import { SendMessageActionPayload } from '../state/threads.state';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    API_URL = environment.API_BASE_URL + '/messages';

    constructor(private http: HttpClient, private authService: AuthService) { }

    editScheduledMessage(messageId: number, messagePayload: EditScheduledMessageActionPayload) {
        return this.http.put(`${this.API_URL}/${messageId}`, { ...messagePayload }, this.authService.getAuthHeaders());
    }

    exportMessages() {
        return this.http.get(`${this.API_URL}/export`, { responseType: 'blob', ...this.authService.getAuthHeaders() });
    }

    getMessages() {
        return this.http.get(this.API_URL, this.authService.getAuthHeaders()) as Observable<Message[]>;
    }

    sendMessage(messagePayload: SendMessageActionPayload) {
        return this.http.post(this.API_URL, { ...messagePayload }, this.authService.getAuthHeaders());
    }

    deleteMessage(messageId: number) {
        return this.http.delete(`${this.API_URL}/${messageId}`, this.authService.getAuthHeaders());
    }
}
