import { Component, Input } from '@angular/core';
import Message from 'src/app/models/message.model';

@Component({
  selector: 'app-scheduled-message',
  templateUrl: './scheduled-message.component.html',
  styleUrls: ['./scheduled-message.component.scss']
})
export class ScheduledMessageComponent {
  @Input() scheduledMessage!: Message;
}
