import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/models/thread.model';
import { ThreadSelectorService } from 'src/app/services/thread-selector.service';

@Component({
  selector: 'app-thread-selector',
  templateUrl: './thread-selector.component.html',
  styleUrls: ['./thread-selector.component.scss'],
})
export class ThreadSelectorComponent implements OnInit {
  threads: Thread[] = [];
  constructor(public readonly threadSelectorService: ThreadSelectorService) {}

  ngOnInit(): void {
    this.threadSelectorService.getThreads().subscribe((threads) => {
      this.threads = threads;
    });
  }
}
