import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getSelfContact } from 'src/app/models/contact.model';
import { Message } from 'src/app/models/message.model';
import { Thread } from 'src/app/models/thread.model';
import { ContactSelectorService } from 'src/app/services/contact-selector.service';
import { MessageService } from 'src/app/services/message.service';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
  selector: 'app-bulk-message-sender',
  templateUrl: './bulk-message-sender.component.html',
  styleUrls: ['./bulk-message-sender.component.scss'],
})
export class BulkMessageSenderComponent {
  messageForm: FormGroup | undefined;
  threads: Thread[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public readonly contactSelectorService: ContactSelectorService,
    public readonly messageService: MessageService,
    private threadService: ThreadsService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      body: ['', Validators.required],
    });
    this.threadService.getThreads().subscribe((threads) => {
      this.threads = threads;
    });
  }

  onSubmit() {
    if (this.messageForm?.valid) {
      for (let contact of this.contactSelectorService.selectedContacts) {
        const thread = this.threads.find((t) => t.contact._id === contact._id);
        if (thread) {
          const message = new Message(
            getSelfContact(),
            contact,
            this.messageForm.value.body,
            thread,
            Date.now()
          );
          this.messageService.sendMessage(message).subscribe();
        } else {
          const newThread = new Thread(contact, []);
          const formValue = this.messageForm.value.body;
          this.threadService.createThread(newThread).subscribe((thread) => {
            const message = new Message(
              getSelfContact(),
              contact,
              formValue,
              thread,
              Date.now()
            );
            this.messageService.sendMessage(message).subscribe();
          });
        }
      }
      this.messageForm.reset();
    }
  }
}
