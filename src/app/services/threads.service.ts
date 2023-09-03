import { Injectable, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
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
  }

  private fetchThreadsFromApi(): void {
    this.http
      .get<Thread[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching threads:', error);
          return [];
        }),
        tap((threads) => {
          this.threadsSubject.next(threads);
        })
      )
      .subscribe();
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
