import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditScheduledMessageDto } from 'focusco-lib';
import { environment } from 'src/environments/environment';
import { DeleteScheduledMessageAPIResponse, DeleteScheduledMessageDto, GetAllScheduledMessagesAPIResponse, ScheduleMessageAPIResponse, ScheduleMessageDto } from '../models/api.models';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ScheduleMessagesService {
    API_URL = environment.API_BASE_URL + '/messages/schedule';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAllScheduledMessages() {
        return this.http.get<GetAllScheduledMessagesAPIResponse>(this.API_URL, this.authService.getAuthHeaders());
    }

    scheduleMessage(payload: ScheduleMessageDto) {
        return this.http.post<ScheduleMessageAPIResponse>(this.API_URL, payload, this.authService.getAuthHeaders());
    }

    editScheduledMessage(payload: EditScheduledMessageDto) {
        return this.http.put<ScheduleMessageAPIResponse>(this.API_URL + '/' + payload.messageId, payload, this.authService.getAuthHeaders());
    }

    deleteScheduledMessage(payload: DeleteScheduledMessageDto) {
        return this.http.delete<DeleteScheduledMessageAPIResponse>(this.API_URL + '/' + payload.cohortId, this.authService.getAuthHeaders());
    }

}
