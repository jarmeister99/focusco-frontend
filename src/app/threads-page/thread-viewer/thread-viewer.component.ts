import { AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import Message from 'src/app/models/message.model';
import Thread from 'src/app/models/thread.model';
import { MessagesService } from 'src/app/services/messages.service';
import { MessageCreatorFormPayload } from 'src/app/shared_components/message-creator/message-creator.component';
import { UserNoteModalComponent } from 'src/app/shared_components/user-note-modal/user-note-modal.component';
import { SendMessageAction, ThreadsState } from 'src/app/state/threads.state';
import { UsersState } from 'src/app/state/users.state';
import { getContactName, getContactNumber, getLatestMessage, getLatestMessageText } from 'src/app/utilities/threadUtils';
@Component({
  selector: 'app-thread-viewer',
  templateUrl: './thread-viewer.component.html',
  styleUrls: ['./thread-viewer.component.scss']
})
export class ThreadViewerComponent implements AfterViewInit, AfterViewChecked {
  @Select(ThreadsState.threads) threads$!: Observable<Thread[]>;
  @Select(ThreadsState.selectedThread) selectedThread$!: Observable<Thread | undefined>;
  selectedThread!: Thread;

  getContactName: (thread: Thread) => string = getContactName;
  getContactNumber: (thread: Thread) => string = getContactNumber;
  getLatestMessage: (thread: Thread) => Message | null = getLatestMessage;
  getLatestMessageText: (thread: Thread) => string = getLatestMessageText;

  latestMessage: Message | null = null;
  constructor(private store: Store, private messagesService: MessagesService, private elementRef: ElementRef, private renderer: Renderer2, private dialog: MatDialog) {
    this.selectedThread$.subscribe((thread) => {
      if (!thread) {
        return;
      }
      this.selectedThread = thread;
    });
  }

  onClick($event: MessageCreatorFormPayload) {
    const senderId = this.store.selectSnapshot(UsersState.owner)?.id;
    const receiverId = this.selectedThread.participants.find((p) => !p.isOwner)?.id;

    if (!senderId || !receiverId) {
      return;
    }

    const messagePayload = {
      senderId,
      receiverId,
      body: $event.body,
      mediaUrl: $event.mediaUrl
    }
    this.store.dispatch(new SendMessageAction(messagePayload)).subscribe();
  }
  ngAfterViewChecked() {
    // For thread ID, store this message ID in localstorage
    const latestMessage = getLatestMessage(this.selectedThread);

    if (window.localStorage.getItem(`thread${this.selectedThread.id}LatestMessageId`) !== `${latestMessage.id}`) {
      window.localStorage.setItem(`thread${this.selectedThread.id}LatestMessageId`, `${latestMessage.id}`);
    }

    if (this.latestMessage !== latestMessage) {
      this.latestMessage = latestMessage;
      this.scrollToBottom();
    }
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    const scrollContainer = this.elementRef.nativeElement.querySelector('mat-card');
    this.renderer.setProperty(scrollContainer, 'scrollTop', scrollContainer.scrollHeight);
  }

  onEdit() {
    const user = this.selectedThread.participants.find((p) => !p.isOwner);
    if (!user) {
      return;
    }


    this.dialog.open(UserNoteModalComponent, {
      data: { user: user }
    });
  }

  selectedUser() {
    return this.selectedThread.participants.find((p) => !p.isOwner);
  }

}
