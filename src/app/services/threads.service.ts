import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Thread from '../models/thread.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  API_URL = environment.API_BASE_URL + '/threads';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getThreads() {
    return this.http.get(this.API_URL, this.authService.getAuthHeaders()) as Observable<Thread[]>;
  }
}
