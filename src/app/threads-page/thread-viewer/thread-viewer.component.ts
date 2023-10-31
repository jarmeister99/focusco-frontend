import { Component, Input } from '@angular/core';
import Message from 'src/app/models/message.model';
import Thread from 'src/app/models/thread.model';
import { MessagesService } from 'src/app/services/messages.service';
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



  constructor(private messagesService: MessagesService) {

  }

  onClick($event: Partial<Message>) {
    const messagePayload = { ...$event };

    // find the participant in this.thread that has isOwner = true
    // and set that as the sender
    messagePayload.senderId = this.thread?.participants.find((p) => p.isOwner)?.id;
    messagePayload.receiverId = this.thread?.participants.find((p) => !p.isOwner)?.id;

    this.messagesService.sendMessage(messagePayload).subscribe(() => {
    });
  }


}
