import { Injectable } from '@angular/core';
import { Thread, getRandomThread } from '../models/thread.model';

@Injectable({
    providedIn: 'root'
})
export class ThreadsService {

    constructor() { }

    getThreads(): Thread[] {
        const threads = []
        for (let i = 0; i < 3; i++) {
            threads.push(getRandomThread({}, {}));
        }
        return threads;
    }
}
