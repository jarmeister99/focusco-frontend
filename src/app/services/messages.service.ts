import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged, interval, map, startWith, switchMap } from 'rxjs';
import Thread from '../models/thread.model';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    API_URL = 'http://localhost:3000/messages';

    constructor(private http: HttpClient) { }

    getThreadsOnInterval$() {
        return interval(5000) // emits a value every 5 seconds
            .pipe(
                startWith(0), // starts immediately
                switchMap(() => this.getThreads()), // switches to new inner observable when source emits, canceling any previous in-flight requests
                map(threads => JSON.stringify(threads)), // maps the threads to a JSON string
                distinctUntilChanged(), // only emits when the current value is different than the last
                map(threadsString => JSON.parse(threadsString)) // maps the JSON string back to an array of threads
            );
    }

    getThreads() {
        return this.http.get(this.API_URL) as Observable<Thread[]>;
    }
}
