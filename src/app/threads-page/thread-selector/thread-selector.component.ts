import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Thread from 'src/app/models/thread.model';
import { UserNoteModalComponent } from 'src/app/shared_components/user-note-modal/user-note-modal.component';
import { getContactName, getLatestMessage } from 'src/app/utilities/threadUtils';

@Component({
  selector: 'app-thread-selector',
  templateUrl: './thread-selector.component.html',
  styleUrls: ['./thread-selector.component.scss']
})
export class ThreadSelectorComponent {
  @Input() thread!: Thread;
  @Input() isSelected!: boolean;
  @Output() threadSelected = new EventEmitter<Thread>();

  getContactName: (thread: Thread) => string = getContactName;
  getLatestMessage: (thread: Thread) => string = getLatestMessage;

  constructor(private dialog: MatDialog) {
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
