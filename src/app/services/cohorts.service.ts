import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cohort } from '../models/cohort.model';
import { CreateCohortPayload } from '../state/cohorts.state';

@Injectable({
    providedIn: 'root'
})
export class CohortsService {
    API_URL = environment.API_BASE_URL + '/cohorts';

    constructor(private http: HttpClient) { }

    getAllCohorts() {
        return this.http.get<Cohort[]>(this.API_URL);
    }
    createCohort(payload: CreateCohortPayload) {
        return this.http.post(this.API_URL, payload);
    }
    addUserToCohort(userId: number, cohortId: number) {
        return this.http.post(this.API_URL + '/addUser', { userId, cohortId });
    }
    removeUserFromCohort(userId: number, cohortId: number) {
        return this.http.post(this.API_URL + '/removeUser', { userId, cohortId });
    }
    deleteCohort(cohortId: number) {
        return this.http.delete(this.API_URL + '/' + cohortId);
    }
    exportCohortMessages(cohortId: number) {
        return this.http.get(this.API_URL + '/' + cohortId + '/export', { responseType: 'blob' });
    }
}
