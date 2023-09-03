import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getSelfContact } from 'src/app/models/contact.model';
import { Message } from 'src/app/models/message.model';
import { Thread } from 'src/app/models/thread.model';
import { MessageService } from 'src/app/services/message.service';
import { ThreadSelectorService } from 'src/app/services/thread-selector.service';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss'],
})
export class MessageSenderComponent implements OnInit {
  messageForm: FormGroup | undefined;
  selectedThread: Thread | undefined;
  constructor(
    private formBuilder: FormBuilder,
    public readonly threadSelectorService: ThreadSelectorService,
    public readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      body: ['', Validators.required],
    });
    this.threadSelectorService.getSelectedThreads().subscribe((thread) => {
      this.selectedThread = thread;
    });
  }

  onSubmit() {
    if (this.messageForm?.valid && this.selectedThread) {
      const newMessage = new Message(
        getSelfContact(),
        this.selectedThread.contact,
        this.messageForm.value.body,
        this.selectedThread,
        Date.now()
      );
      this.messageService.sendMessage(newMessage).subscribe();
      this.messageForm.reset();
    }
  }
}
