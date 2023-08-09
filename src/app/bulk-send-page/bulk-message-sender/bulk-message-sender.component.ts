import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getSelfContact } from 'src/app/models/contact.model';
import { Message } from 'src/app/models/message.model';
import { ContactSelectorService } from 'src/app/services/contact-selector.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-bulk-message-sender',
  templateUrl: './bulk-message-sender.component.html',
  styleUrls: ['./bulk-message-sender.component.scss']
})
export class BulkMessageSenderComponent {
  messageForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder, public readonly contactSelectorService: ContactSelectorService, public readonly messageService: MessageService) { }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      body: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.messageForm?.valid) {
      const messages = [];
      for (let contact of this.contactSelectorService.selectedContacts) {
        messages.push(new Message(
          getSelfContact(),
          contact,
          this.messageForm.value.body,
          Date.now()
        ));
      }
      this.messageService.sendMessages(messages);
      this.messageForm.reset();
    }

  }

}

