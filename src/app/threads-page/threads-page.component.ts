import { Component } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import Thread from '../models/thread.model';
import { MessagesService } from '../services/messages.service';
import { SimpleStateService } from '../services/simple-state.service';
import { ThreadSelectorService } from '../services/thread-selector.service';
import { ThreadsService } from '../services/threads.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
  styleUrls: ['./threads-page.component.scss'],
  providers: [SimpleStateService]

})
export class ThreadsPageComponent {
  threads$: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>([]);
  constructor(private usersService: UsersService, private messagesService: MessagesService, private threadsService: ThreadsService, private threadSelectorService: ThreadSelectorService, private simpleState: SimpleStateService) {
    this.threadsService.getThreadsOnInterval$().subscribe((threads: Thread[]) => {
      this.threads$.next(threads);
      // also refresh the selected thread
      this.threadSelectorService.getSelectedThread().pipe(take(1)).subscribe((thread: Thread | null) => {
        if (thread) {
          const refreshedThread = threads.find((t: Thread) => t.id === thread.id);
          if (refreshedThread) {
            this.threadSelectorService.selectThread(refreshedThread);
          }
        }
      });

    });
  }
  onThreadSelected(thread: Thread) {
    this.threadSelectorService.selectThread(thread);
  }

  getSelectedThread() {
    return this.threadSelectorService.getSelectedThread();
  }

  onClick($event: any) {
    // bulk send
    const selectedContacts = this.simpleState.get().selectedItems;

    this.usersService.getOwner().pipe(take(1)).subscribe((owner) => {
      for (const contact of selectedContacts) {
        const messagePayload = { ...$event };
        messagePayload.receiverId = contact.id;
        messagePayload.senderId = owner.id;
        this.messagesService.sendMessage(messagePayload).subscribe(() => {
        });
      }
    });
  }

  exportAll() {
    this.messagesService.exportMessages().subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

}
