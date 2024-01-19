import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserToCohortAPIResponse, AddUserToCohortDto, CreateCohortAPIResponse, CreateCohortDto, DeleteCohortAPIResponse, DeleteCohortDto, ExportCohortMessagesDto, GetAllCohortsAPIResponse, RemoveUserFromCohortAPIResponse, RemoveUserFromCohortDto } from 'focusco-lib';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CohortsService {
    API_URL = environment.API_BASE_URL + '/cohorts';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAllCohorts() {
        return this.http.get<GetAllCohortsAPIResponse>(this.API_URL, this.authService.getAuthHeaders());
    }
    createCohort(payload: CreateCohortDto) {
        return this.http.post<CreateCohortAPIResponse>(this.API_URL, payload, this.authService.getAuthHeaders());
    }
    addUserToCohort(payload: AddUserToCohortDto) {
        return this.http.post<AddUserToCohortAPIResponse>(this.API_URL + '/' + payload.cohortId + '/addUser', { userId: payload.userId }, this.authService.getAuthHeaders());
    }
    removeUserFromCohort(payload: RemoveUserFromCohortDto) {
        return this.http.post<RemoveUserFromCohortAPIResponse>(this.API_URL + '/' + payload.cohortId + '/removeUser', { userId: payload.userId }, this.authService.getAuthHeaders());
    }
    deleteCohort(payload: DeleteCohortDto) {
        return this.http.delete<DeleteCohortAPIResponse>(this.API_URL + '/' + payload.cohortId, this.authService.getAuthHeaders());
    }
    exportCohortMessagespayload(payload: ExportCohortMessagesDto) {
        return this.http.get(this.API_URL + '/' + payload.cohortId + '/export', { responseType: 'blob', ...this.authService.getAuthHeaders() });
    }
}
