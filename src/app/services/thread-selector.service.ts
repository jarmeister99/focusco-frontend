import { Injectable } from '@angular/core';
import { Thread } from '../models/thread.model';
import { ThreadsService } from './threads.service';

@Injectable({
    providedIn: 'root'
})
export class ThreadSelectorService {
    threads: Thread[] = [];
    selectedThread: Thread | undefined = undefined;

    constructor(readonly threadsService: ThreadsService) {
        this.threads = threadsService.getThreads();
        this.selectedThread = this.threads[0];
    }

    selectThread(thread: Thread) {
        this.selectedThread = thread;
    }
}
