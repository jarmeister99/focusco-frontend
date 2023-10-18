import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  API_URL = 'http://localhost:3000/threads';

  constructor(private http: HttpClient) {
    interval(5000).subscribe(() => {
      this.getThreads().pipe().subscribe((res: any) => {
        console.log(res);
      });
    });
  }

  // create a function that returns an observable that returns the result of getThreads every 5000 ms
  getThreadsOnInterval$() {
    return interval(5000).pipe(
      switchMap(() => this.getThreads())
    );
  }

  getThreads() {
    return this.http.get(this.API_URL);
  }
}
