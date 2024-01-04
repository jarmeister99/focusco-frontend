import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import User from 'src/app/models/user.model';
import { EditUsersAction } from 'src/app/state/users.actions';

@Component({
  selector: 'app-bulk-autoreply',
  templateUrl: './bulk-autoreply.component.html',
  styleUrls: ['./bulk-autoreply.component.scss']
})
export class BulkAutoreplyComponent {

  autoreplyForm: FormGroup;

  @Input() users!: User[] | undefined | null;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.autoreplyForm = this.formBuilder.group({
      autoreply: ''
    });
  }

  onSubmit() {
    if (!this.users) {
      return;
    }

    const editUsersPayload = this.users.map(user => {
      return {
        id: user.id,
        autoreply: this.autoreplyForm.value.autoreply
      }
    });

    this.store.dispatch(new EditUsersAction(editUsersPayload)).subscribe(() => {
      this.autoreplyForm.reset();
    });

  }
  inputValid() {
    return !!this.autoreplyForm.value.autoreply;
  }
  onClearAllClick() {
    if (!this.users) {
      return;
    }
    // create an new user with the new autoreply value for each input user
    const editUsersPayload = this.users.map(user => {
      return {
        id: user.id,
        autoreply: ''
      }
    });

    this.store.dispatch(new EditUsersAction(editUsersPayload)).subscribe(() => {
      this.autoreplyForm.reset();
    });
  }
}
