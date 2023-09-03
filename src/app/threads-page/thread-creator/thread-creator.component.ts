import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Thread } from 'src/app/models/thread.model';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
  selector: 'app-thread-creator',
  templateUrl: './thread-creator.component.html',
  styleUrls: ['./thread-creator.component.scss'],
})
export class ThreadCreatorComponent {
  selectedContact: Contact | undefined = undefined;

  constructor(private threadService: ThreadsService) {}

  handleContactSelected(contact: Contact) {
    this.selectedContact = contact;
  }

  handleThreadCreated() {
    if (!this.selectedContact) {
      return;
    }
    const thread = new Thread(this.selectedContact, []);

    this.threadService.createThread(thread).subscribe();
  }
}
