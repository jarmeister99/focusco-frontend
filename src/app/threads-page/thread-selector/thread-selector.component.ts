import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Message from 'src/app/models/message.model';
import Thread from 'src/app/models/thread.model';
import { UserNoteModalComponent } from 'src/app/shared_components/user-note-modal/user-note-modal.component';
import { getContactName, getLatestMessage } from 'src/app/utilities/threadUtils';

@Component({
  selector: 'app-thread-selector',
  templateUrl: './thread-selector.component.html',
  styleUrls: ['./thread-selector.component.scss']
})
export class ThreadSelectorComponent implements DoCheck {
  @Input() thread!: Thread;
  @Input() isSelected!: boolean;
  @Output() threadSelected = new EventEmitter<Thread>();

  getContactName: (thread: Thread) => string = getContactName;
  getLatestMessage: (thread: Thread) => Message | null = getLatestMessage;

  hasUnreadMessage: boolean = false;

  constructor(private dialog: MatDialog) {
  }
  ngDoCheck(): void {
    const latestMessage = getLatestMessage(this.thread);
    if (window.localStorage.getItem(`thread${this.thread.id}LatestMessageId`) !== `${latestMessage.id}`) {
      console.log('Unread message')
      this.hasUnreadMessage = true;
    }
    else {
      this.hasUnreadMessage = false;
    }
  }

  selectThread() {
    this.threadSelected.emit(this.thread);
  }

  selectedUser() {
    return this.thread.participants.find((p) => !p.isOwner);
  }
  onEdit() {
    this.dialog.open(UserNoteModalComponent, {
      data: {
        user: this.selectedUser()
      }
    });
  }
}
