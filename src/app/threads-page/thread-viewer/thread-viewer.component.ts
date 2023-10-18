import { Component, Input } from '@angular/core';
import Thread from 'src/app/models/thread.model';
import { getContactName, getLatestMessage } from 'src/app/utilities/threadUtils';

@Component({
  selector: 'app-thread-viewer',
  templateUrl: './thread-viewer.component.html',
  styleUrls: ['./thread-viewer.component.scss']
})
export class ThreadViewerComponent {
  @Input() thread!: Thread | null;

  getContactName: (thread: Thread) => string = getContactName;
  getLatestMessage: (thread: Thread) => string = getLatestMessage;
}
