import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThreadModel } from 'src/app/models/models';
import { SentMessage } from 'src/app/models/prisma.models';
import { UserNoteModalComponent } from 'src/app/shared-components/user-note-modal/user-note-modal.component';
import { clientHasUnreadMessage, getContactName, getLatestMessage } from 'src/app/utilities/threadUtils';

@Component({
  selector: 'app-thread-selector',
  templateUrl: './thread-selector.component.html',
  styleUrls: ['./thread-selector.component.scss']
})
export class ThreadSelectorComponent implements DoCheck {
  getContactName: (thread: ThreadModel) => string = getContactName;
  getLatestMessage: (thread: ThreadModel) => SentMessage | null = getLatestMessage;

  @Input() thread!: ThreadModel;
  @Input() isSelected!: boolean;
  @Output() threadSelected = new EventEmitter<ThreadModel>();

  hasUnreadMessage: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngDoCheck(): void {
    if (clientHasUnreadMessage(this.thread)) {
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
    return this.thread.user;
  }

  onEdit() {
    this.dialog.open(UserNoteModalComponent, {
      data: {
        user: this.selectedUser()
      }
    });
  }
}
