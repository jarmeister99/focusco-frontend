import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import User from 'src/app/models/user.model';
import { CohortsState } from 'src/app/state/cohorts.state';
import { UsersState } from 'src/app/state/users.state';
import { MessageCreatorFormPayload } from '../message-creator/message-creator.component';

export interface BulkSendComponentPayload {
  receivers: User[];
  triggerAt: Date;
  messagePayload: MessageCreatorFormPayload;
}

@Component({
  selector: 'app-bulk-send-component',
  templateUrl: './bulk-send-component.component.html',
  styleUrls: ['./bulk-send-component.component.scss']
})
export class BulkSendComponentComponent {
  @Select(CohortsState.cohorts) cohorts$!: Observable<User[]>;
  @Select(UsersState.users) users$!: Observable<User[]>;
  @Output() bulkSend: EventEmitter<BulkSendComponentPayload> = new EventEmitter<BulkSendComponentPayload>();

  dateFormControl: FormControl;
  cohortForm: FormGroup;
  cohortFormReady = false;

  selectedUsers: User[] = [];

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

  areContactsSelected() {
    return this.selectedUsers.length > 0;
  }

  onSubmit(messageCreatorPayload: MessageCreatorFormPayload) {
    let receivers: User[] = [];
    if (this.isCohortSelected()) {
      receivers = this.getUsersInSelectedCohort();
    }
    else {
      receivers = this.selectedUsers;
    }
    const payload: BulkSendComponentPayload = {
      receivers,
      triggerAt: this.dateFormControl.value,
      messagePayload: messageCreatorPayload,
    }
    this.cohortForm.reset();
    this.bulkSend.emit(payload);
  }

  onSelectedUsersChange($event: User[]) {
    this.selectedUsers = $event;
  }

  shouldDisableMessageCreatorButton() {
    return !this.areContactsSelected() && !this.isCohortSelected();
  }
}
