import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ThreadModel } from 'src/app/models/models';
import { SentMessage } from 'src/app/models/prisma.models';
import { MessagesService } from 'src/app/services/messages.service';
import { MessageCreatorFormPayload } from 'src/app/shared-components/message-creator/message-creator.component';
import { UserNoteModalComponent } from 'src/app/shared-components/user-note-modal/user-note-modal.component';
import { SendMessageAction, SendMessageActionPayload } from 'src/app/state/messages.state';
import { UsersState } from 'src/app/state/users.state';
import { clientHasUnreadMessage, clientMarkThreadAsSeen, getContactName, getContactNumber, getLatestMessage } from 'src/app/utilities/threadUtils';
@Component({
  selector: 'app-thread-viewer',
  templateUrl: './thread-viewer.component.html',
  styleUrls: ['./thread-viewer.component.scss']
})
export class ThreadViewerComponent implements AfterViewInit, AfterViewChecked {
  getContactName = getContactName;
  getContactNumber = getContactNumber;
  getLatestMessage = getLatestMessage;

  @Input() thread!: ThreadModel;

  latestMessage: SentMessage | null = null;

  constructor(private store: Store, private messagesService: MessagesService, private elementRef: ElementRef, private renderer: Renderer2, private dialog: MatDialog) { }

  ngAfterViewChecked() {
    // For thread ID, store this message ID in localstorage
    const latestMessage = getLatestMessage(this.thread);

    if (!(clientHasUnreadMessage(this.thread))) {
      clientMarkThreadAsSeen(this.thread)
    }


    if (this.latestMessage !== latestMessage) {
      this.latestMessage = latestMessage;
      this.scrollToBottom();
    }
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const scrollContainer = this.elementRef.nativeElement.querySelector('mat-card');
    this.renderer.setProperty(scrollContainer, 'scrollTop', scrollContainer.scrollHeight);
  }


  onClickEditUserNoteButton() {
    this.dialog.open(UserNoteModalComponent, {
      data: { user: this.thread.user }
    });
  }

  onClickSendMessageButton($event: MessageCreatorFormPayload) {
    const sendMessagePayload: SendMessageActionPayload = {
      body: $event.body,
      mediaUrl: $event.mediaUrl,
      receiverId: this.thread.user.id,
      senderId: this.store.selectSnapshot(UsersState.owner).id
    }
    this.store.dispatch(new SendMessageAction(sendMessagePayload));
  }
}
