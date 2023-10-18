import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Thread from '../models/thread.model';

@Injectable({
    providedIn: 'root'
})
export class ThreadSelectorService {

    selectedThread: BehaviorSubject<Thread | null> = new BehaviorSubject<Thread | null>(null);
    constructor() { }

    selectThread(thread: Thread) {
        this.selectedThread.next(thread);
    }

    unselectThread() {
        this.selectedThread.next(null);
    }

    getSelectedThread() {
        return this.selectedThread.asObservable();
    }
}
