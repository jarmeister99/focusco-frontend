import { Component, EventEmitter, Input, Output } from '@angular/core';
import Thread from 'src/app/models/thread.model';
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

  constructor() {
  }

  selectThread() {
    this.threadSelected.emit(this.thread);
  }
}
