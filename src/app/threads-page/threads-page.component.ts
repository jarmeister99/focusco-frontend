import { Component } from '@angular/core';
import { ThreadsService } from '../services/threads.service';

@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
  styleUrls: ['./threads-page.component.scss']
})
export class ThreadsPageComponent {
  constructor(private threadsService: ThreadsService) {

    this.threadsService.getThreadsOnInterval$().subscribe();
  }
}
