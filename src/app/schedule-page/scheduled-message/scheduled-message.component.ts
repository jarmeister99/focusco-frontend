import { Component, Input } from '@angular/core';
import ScheduledMessage from 'src/app/models/scheduled-message.model';

@Component({
  selector: 'app-scheduled-message',
  templateUrl: './scheduled-message.component.html',
  styleUrls: ['./scheduled-message.component.scss']
})
export class ScheduledMessageComponent {
  @Input() scheduledMessage!: ScheduledMessage;
}
