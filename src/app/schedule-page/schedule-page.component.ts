import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import ScheduledMessage from '../models/scheduled-message.model';
import User from '../models/user.model';
import { ScheduleMessagesService } from '../services/schedule.messages.service';
import { SimpleStateService } from '../services/simple-state.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  providers: [SimpleStateService]
})
export class SchedulePageComponent implements OnInit {

  scheduledMessages: BehaviorSubject<ScheduledMessage[]> = new BehaviorSubject<ScheduledMessage[]>([]);
  dateFormControl: FormControl;

  constructor(private simpleState: SimpleStateService, private scheduleMessagesService: ScheduleMessagesService) {
    this.dateFormControl = new FormControl(new Date());

  }

  ngOnInit(): void {
    this.scheduleMessagesService.getScheduledMessagesOnInterval$().subscribe((scheduledMessages) => {
      this.scheduledMessages.next(scheduledMessages);
    });
  }

  onSubmit($messagePayload: any) {
    const messagePayload = $messagePayload;
    const triggerAt = this.dateFormControl.value;
    const receiverIds = this.simpleState.get().selectedItems.map((item: User) => item.id);
    this.scheduleMessagesService.scheduleMessages(receiverIds, messagePayload, triggerAt).subscribe();
  }
}
