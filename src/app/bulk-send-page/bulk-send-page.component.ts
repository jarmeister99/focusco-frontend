import { Component } from '@angular/core';
import { SendMessagePayload } from '../library/send-message/send-message.component';
import { Contact, getSelfContact } from '../models/contact.model';
import { Message } from '../models/message.model';
import { Thread } from '../models/thread.model';
import { ContactSelectorService } from '../services/contact-selector.service';
import { MessageService } from '../services/message.service';
import { ThreadsService } from '../services/threads.service';

@Component({
  selector: 'app-bulk-send-page',
  templateUrl: './bulk-send-page.component.html',
  styleUrls: ['./bulk-send-page.component.scss']
})
export class BulkSendPageComponent {
  threads: Thread[] = [];
  selectedContacts: Contact[] = [];

  onMessageSend(messageData: SendMessagePayload) {
    // get all selected contacts
    for (let contact of this.selectedContacts) {
      // for each contact, look for an existing thread
      const thread = this.threads.find((t) => t.contact._id === contact._id);
      if (thread) {
        const message = new Message(
          getSelfContact(),
          contact,
          messageData.text,
          thread,
          Date.now(),
          messageData.link,
          messageData.sendVcf
        );
        this.messageService.sendMessage(message).subscribe();
      }
      else {
        const newThread = new Thread(contact, []);
        this.threadsService.createThread(newThread).subscribe((thread) => {
          const message = new Message(
            getSelfContact(),
            contact,
            messageData.text,
            thread,
            Date.now(),
            messageData.link,
            messageData.sendVcf
          );
          this.messageService.sendMessage(message).subscribe();
        });
      }
    }
  }
  constructor(public readonly contactSelectorService: ContactSelectorService, public readonly threadsService: ThreadsService, public readonly messageService: MessageService) { }

  ngOnInit(): void {
    this.threadsService.getThreads().subscribe((threads) => {
      this.threads = threads;
    });
    this.contactSelectorService.selectedContacts.subscribe((contacts) => {
      this.selectedContacts = contacts;
    });
  }

  shouldShowMessageSender(): boolean {
    return this.selectedContacts.length > 0;
  }
}
