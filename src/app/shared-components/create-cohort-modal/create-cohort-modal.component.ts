import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import User from 'src/app/models/user.model';
import { CreateCohortAction, CreateCohortPayload } from 'src/app/state/cohorts.state';
import { UsersState } from 'src/app/state/users.state';

@Component({
  selector: 'app-create-cohort-modal',
  templateUrl: './create-cohort-modal.component.html',
  styleUrls: ['./create-cohort-modal.component.scss']
})
export class CreateCohortModalComponent {
  @Select(UsersState.users) users$!: Observable<User[]>;

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private store: Store, private dialogRef: MatDialogRef<CreateCohortModalComponent>) {
    this.formGroup = this.formBuilder.group({
      name: '',
      description: '',
      users: null
    });
  }

  createCohort() {
    const payload: CreateCohortPayload = {
      name: this.formGroup.value.name,
      description: this.formGroup.value.description,
      users: this.formGroup.value.users
    }
    this.store.dispatch(new CreateCohortAction(payload)).subscribe(() => {
      this.formGroup.reset();
      this.dialogRef.close();
    });
  }
}
