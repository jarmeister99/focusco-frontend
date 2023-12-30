import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cohort } from '../models/cohort.model';
import { CreateCohortPayload } from '../state/cohorts.state';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CohortsService {
    API_URL = environment.API_BASE_URL + '/cohorts';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAllCohorts() {
        return this.http.get<Cohort[]>(this.API_URL, this.authService.getAuthHeaders());
    }
    createCohort(payload: CreateCohortPayload) {
        return this.http.post(this.API_URL, payload, this.authService.getAuthHeaders());
    }
    addUserToCohort(userId: number, cohortId: number) {
        return this.http.post(this.API_URL + '/addUser', { userId, cohortId }, this.authService.getAuthHeaders());
    }
    removeUserFromCohort(userId: number, cohortId: number) {
        return this.http.post(this.API_URL + '/removeUser', { userId, cohortId }, this.authService.getAuthHeaders());
    }
    deleteCohort(cohortId: number) {
        return this.http.delete(this.API_URL + '/' + cohortId, this.authService.getAuthHeaders());
    }
    exportCohortMessages(cohortId: number) {
        return this.http.get(this.API_URL + '/' + cohortId + '/export', { responseType: 'blob', ...this.authService.getAuthHeaders() });
    }
}
