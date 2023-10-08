import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  apiUrl = 'http://localhost:3000/export';

  constructor(private http: HttpClient) {

  }
  getAllMessages() {
    const MESSAGES_PATH = 'messages';
    return this.http.get(`${this.apiUrl}/${MESSAGES_PATH}`, { responseType: 'blob' });
  }
}
