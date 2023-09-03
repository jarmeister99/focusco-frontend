import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { Thread } from 'src/app/models/thread.model';
import { MessageService } from 'src/app/services/message.service';
import { ThreadSelectorService } from 'src/app/services/thread-selector.service';

@Component({
  selector: 'app-thread-selected-pane',
  templateUrl: './thread-selected-pane.component.html',
  styleUrls: ['./thread-selected-pane.component.scss'],
})
export class ThreadSelectedPaneComponent implements OnInit {
  selectedThread: Thread | undefined = undefined;
  messages: Message[] = [];
  messagesForThread: Message[] = [];
  constructor(
    public readonly threadSelectorService: ThreadSelectorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.threadSelectorService.getSelectedThreads().subscribe((thread) => {
      this.selectedThread = thread;
      this.messagesForThread = this.messages.filter((message) => {
        if (message.thread instanceof Thread) {
          return message.thread._id === thread?._id;
        } else {
          return message.thread === thread?._id;
        }
      });
    });
    this.messageService.getMessages().subscribe((messages) => {
      this.messages = messages;
      this.messagesForThread = this.messages.filter((message) => {
        if (message.thread instanceof Thread) {
          return message.thread._id === this.selectedThread?._id;
        } else {
          return message.thread === this.selectedThread?._id;
        }
      });
    });
  }
}
