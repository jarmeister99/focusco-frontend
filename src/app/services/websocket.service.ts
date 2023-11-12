// websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    API_URL = environment.API_BASE_URL
    private socket;

    constructor() {
        this.socket = io(this.API_URL); // replace with your server address
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
        });
    }
}