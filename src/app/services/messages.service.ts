import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllMessagesAPIResponse, SendMessageAPIResponse, SendMessageDto } from 'focusco-lib';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    API_URL = environment.API_BASE_URL + '/messages';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAllMessages() {
        return this.http.get<GetAllMessagesAPIResponse>(this.API_URL, this.authService.getAuthHeaders());
    }
    sendMessage(payload: SendMessageDto) {
        return this.http.post<SendMessageAPIResponse>(this.API_URL, payload, this.authService.getAuthHeaders());
    }
}
