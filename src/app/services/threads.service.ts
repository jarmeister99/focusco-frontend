import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, interval, startWith, switchMap, tap } from 'rxjs';
import { Thread } from '../models/thread.model';

@Injectable({
  providedIn: 'root',
})
export class ThreadsService {
  apiUrl = 'http://localhost:3000/threads';
  private threadsSubject: BehaviorSubject<Thread[]> = new BehaviorSubject<
    Thread[]
  >([]);

  contacts: Thread[] = [];
  constructor(private http: HttpClient) {
    this.fetchThreadsFromApi();
    const checkInterval$ = interval(5000);

    // Use switchMap to switch to a new observable whenever the timer emits
    checkInterval$
      .pipe(
        startWith(0), // Start with an initial emission to trigger the first API call
        switchMap(() => this.fetchThreadsFromApi())
      )
      .subscribe((threads) => {
        this.threadsSubject.next(threads);
      });
  }

  // Fetch messages from the API and return an observable
  private fetchThreadsFromApi(): Observable<Thread[]> {
    return this.http.get<Thread[]>(this.apiUrl);
  }

  getThreads(): Observable<Thread[]> {
    return this.threadsSubject.asObservable();
  }

  createThread(thread: Thread): Observable<Thread> {
    return this.http
      .post<Thread>(this.apiUrl, { contactId: thread.contact._id })
      .pipe(
        tap((newThread) => {
          const updatedThreads = [...this.threadsSubject.value, newThread];
          this.threadsSubject.next(updatedThreads);
        }),
        catchError((error) => {
          console.error('Error creating contact:', error);
          throw error;
        })
      );
  }

  deleteThread(thread: Thread): Observable<Thread> {
    return this.http
      .post<Thread>(`${this.apiUrl}/delete`, { _id: thread._id })
      .pipe(
        tap(() => {
          const updatedThreads = this.threadsSubject.value.filter(
            (t) => t._id !== thread._id
          );
          this.threadsSubject.next(updatedThreads);
        }),
        catchError((error) => {
          console.error('Error deleting thread:', error);
          throw error;
        })
      );
  }
}
