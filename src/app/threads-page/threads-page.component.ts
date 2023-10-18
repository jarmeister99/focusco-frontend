import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Thread from '../models/thread.model';
import { ThreadSelectorService } from '../services/thread-selector.service';
import { ThreadsService } from '../services/threads.service';

@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
  styleUrls: ['./threads-page.component.scss']
})
export class ThreadsPageComponent {
  threads$: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>([]);
  constructor(private threadsService: ThreadsService, private threadSelectorService: ThreadSelectorService) {
    this.threadsService.getThreadsOnInterval$().subscribe((threads: Thread[]) => {
      this.threads$.next(threads);
    });
  }
  onThreadSelected(thread: Thread) {
    this.threadSelectorService.selectThread(thread);
  }

  getSelectedThread() {
    return this.threadSelectorService.getSelectedThread();
  }
}
