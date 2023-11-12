import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import User from 'src/app/models/user.model';
import { UserNoteModalComponent } from 'src/app/shared_components/user-note-modal/user-note-modal.component';
import { DeleteUserAction, EditUserAction } from 'src/app/state/users.actions';

@Component({
  selector: 'app-edit-users-card',
  templateUrl: './edit-users-card.component.html',
  styleUrls: ['./edit-users-card.component.scss']
})
export class EditUsersCardComponent implements OnInit {
  @Input() user!: User;

  editUserForm?: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      name: new FormControl({ value: this.user.name, disabled: false }),
      number: new FormControl({ value: this.user.number, disabled: true }),
      autoreply: new FormControl({ value: this.user.autoreply, disabled: false }),
    });
  }

  formAvailableToSend() {
    // use typescript and get the value of the key on the user model
    for (const key of Object.keys(this.editUserForm?.value) as (keyof User)[]) {
      if (key in this.user && this.editUserForm?.value[key] !== this.user[key]) {
        return true;
      }
    }
    return false;

  }

  onSubmit() {
    const editUserPayload = this.editUserForm?.value;
    this.store.dispatch(new EditUserAction(this.user.id, editUserPayload)).subscribe(() => {
      this.editUserForm?.reset();
    });
  }
  onDelete() {
    if (window.confirm(`Are you sure you want to delete ${this.user.name}?`)) {
      this.store.dispatch(new DeleteUserAction(this.user.id));
    }
  }
  onEdit() {
    this.dialog.open(UserNoteModalComponent, {
      data: { user: this.user }
    });
  }
}
