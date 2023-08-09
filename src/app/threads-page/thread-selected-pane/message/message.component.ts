import { Component, Input } from '@angular/core';
import { checkEquality, getSelfContact } from 'src/app/models/contact.model';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: Message | undefined = undefined;
  constructor() { }

  parseTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${month}-${day} ${hours}:${minutes}`;
  }

  isFromSelf(message: Message) {
    return checkEquality(message.sender, getSelfContact());
  }
}
