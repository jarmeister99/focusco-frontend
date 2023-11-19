import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cohort } from 'src/app/models/cohort.model';
import { CohortsState } from 'src/app/state/cohorts.state';
import { CreateUserAction, CreateUserPayload } from 'src/app/state/users.actions';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {

  @Select(CohortsState.cohorts) cohorts$!: Observable<Cohort[]>;

  createUserForm: FormGroup;
  cohortFormReady = false;

  constructor(private formBuilder: FormBuilder, private store: Store, private dialogRef: MatDialogRef<CreateUserModalComponent>) {
    this.createUserForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      number: new FormControl('', [this.phoneNumberValidator, Validators.required]),
    });

  }
  ngOnInit() {
    this.cohorts$.subscribe((cohorts) => {
      if (cohorts.length > 0) {
        this.createUserForm.addControl('cohort', new FormControl(null));
        this.cohortFormReady = true;
      }
    });
  }

  createUser() {
    if (!this.createUserForm.valid) { return; }
    const payload: CreateUserPayload = {
      name: this.createUserForm.value.name,
      number: this.createUserForm.value.number,
      cohort: this.createUserForm.value.cohort
    }
    this.store.dispatch(new CreateUserAction(payload)).subscribe(() => {
      this.createUserForm.reset();
      this.dialogRef.close();
    });
  }

  // create a validator that requires the number to be in the form +15555555555
  phoneNumberValidator(control: any) {
    const phoneNumber = control.value;
    if (!phoneNumber) {
      return null;
    }
    const valid = phoneNumber.match(/^\+1\d{10}$/);
    return valid ? null : { invalidNumber: true };
  }
}
