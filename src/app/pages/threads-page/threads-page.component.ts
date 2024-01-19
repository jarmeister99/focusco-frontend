import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { ThreadModel } from 'src/app/models/models';
import { SentMessage } from 'src/app/models/prisma.models';
import { BulkSendComponentPayload } from 'src/app/shared-components/bulk-send-component/bulk-send-component.component';
import { GetMessagesAction, MessagesState } from 'src/app/state/messages.state';
import { WebsocketService } from '../../services/websocket.service';



@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
  styleUrls: ['./threads-page.component.scss'],
  providers: []

})
export class ThreadsPageComponent implements OnInit {
  @Select(MessagesState.messages) messages$!: Observable<SentMessage[]>;

  loadData$: Subject<void> = new Subject();

  threads: ThreadModel[] = [];
  selectedThread: ThreadModel | null | undefined = null;

  constructor(private websocketService: WebsocketService, private store: Store) { }

  ngOnInit(): void {
    this.websocketService.onMessage().subscribe(() => {
      this.loadData$.next();
    });
    this.loadData$.subscribe(() => {
      this.store.dispatch(new GetMessagesAction()).subscribe();
    });
    this.messages$.subscribe(messages => {
      this.threads = this.getThreadsFromMessages(messages);
    });

    this.loadData$.next();
  }

  private getThreadsFromMessages(messages: SentMessage[]) {
    const threads: ThreadModel[] = [];
    messages.forEach(message => {
      const thread = threads.find(thread => thread.user.id === message.receiver.id);
      if (thread) {
        thread.messages.push(message);
      } else {
        this.threads.push({
          messages: [message],
          user: message.receiver
        });
      }
    });
    return threads;
  }

  onBulkSend($event: BulkSendComponentPayload) {
    console.log($event);
  }

  onThreadSelected($event: ThreadModel) {
    const selectedUser = $event.user;
    this.selectedThread = this.threads.find(thread => thread.user.id === selectedUser.id);
  }
}
