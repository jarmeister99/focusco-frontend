import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ScheduledMessage, User } from 'src/app/models/prisma.models';
import { EditScheduledMessageFormPayload, EditScheduledMessageModalComponent } from 'src/app/shared-components/edit-scheduled-message-modal/edit-scheduled-message-modal';
import { CohortsState } from 'src/app/state/cohorts.state';
import { DeleteScheduledMessageAction, ScheduledMessagesState } from 'src/app/state/scheduledMessages.state';
import { UsersState } from 'src/app/state/users.state';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  providers: []
})
export class SchedulePageComponent implements OnInit {

  @Select(ScheduledMessagesState.scheduledMessages) scheduledMessages$!: Observable<ScheduledMessage[]>;
  @Select(CohortsState.cohorts) cohorts$!: Observable<User[]>;

  dateFormControl: FormControl;
  displayedColumns: string[] = ['name', 'body', 'mediaUrl', 'triggerAt', 'delete'];
  cohortForm: FormGroup;
  cohortFormReady = false;

  constructor(private store: Store, private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.dateFormControl = new FormControl(new Date());
    this.cohortForm = formBuilder.group({});
  }
  ngOnInit(): void {
    this.cohorts$.subscribe((cohorts) => {
      if (cohorts.length > 0) {
        this.cohortForm.addControl('cohort', new FormControl(null));
        this.cohortFormReady = true;
      }
    });
  }


  onDelete(message: ScheduledMessage) {
    if (window.confirm(`Are you sure you want to delete this message?`)) {
      this.store.dispatch(new DeleteScheduledMessageAction(message.id)).subscribe();
    }
  }
  onClickEdit(message: ScheduledMessage) {
    // TODO
    const dialogData: EditScheduledMessageFormPayload = {
      body: message.messageTemplate.body,
      mediaUrl: message.messageTemplate.mediaUrl,
      triggerAt: message.triggerAt!,
      receiverName: message.receiver.name,
      messageId: message.id,
    }
    this.dialog.open(EditScheduledMessageModalComponent, {
      data: dialogData
    });
  }

  isCohortSelected() {
    return this.cohortForm.value.cohort;
  }

  getUsersInSelectedCohort() {
    const cohort = this.cohortForm.value.cohort;
    if (!cohort) return [];
    const allUsers = this.store.selectSnapshot(UsersState.users);
    const filteredUsers = allUsers.filter((user: User) => user.cohorts.some((userCohort) => userCohort.cohortId === cohort.id));
    return filteredUsers;
  }
  getUsersInSelectedCohortTextString() {
    const filteredUsers = this.getUsersInSelectedCohort();
    if (filteredUsers.length === 0) return '';
    const textString = filteredUsers.map((user: User) => user.name).join(', ');
    return textString;
  }

}
