import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Thread } from '../models/thread.model';
import { ThreadsService } from './threads.service';

@Injectable({
  providedIn: 'root',
})
export class ThreadSelectorService {
  private threadsSubject: BehaviorSubject<Thread[]> = new BehaviorSubject<
    Thread[]
  >([]);

  private selectedThreadSubject: BehaviorSubject<Thread | undefined> =
    new BehaviorSubject<Thread | undefined>(undefined);

  // When this service is first created
  constructor(readonly threadsService: ThreadsService) {
    // We want to get the threads from the threads service (which gets them from the API)
    this.threadsService.getThreads().subscribe((threads) => {
      this.threadsSubject.next(threads);
    });
  }

  getThreadsObservable(): Observable<Thread[]> {
    return this.threadsSubject.asObservable();
  }
  getSelectedThreads(): Observable<Thread | undefined> {
    return this.selectedThreadSubject.asObservable();
  }

  selectThread(thread: Thread) {
    this.selectedThreadSubject.next(thread);
  }
}
