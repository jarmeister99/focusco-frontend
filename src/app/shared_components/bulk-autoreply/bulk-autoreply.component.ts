import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-bulk-autoreply',
  templateUrl: './bulk-autoreply.component.html',
  styleUrls: ['./bulk-autoreply.component.scss']
})
export class BulkAutoreplyComponent {

  autoreplyForm: FormGroup;

  @Input() users!: User[] | undefined | null;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.autoreplyForm = this.formBuilder.group({
      autoreply: ''
    });
  }

  onSubmit() {
    if (!this.users) {
      return;
    }
    // create an new user with the new autoreply value for each input user
    const updatedUsers = this.users.map(user => {
      return {
        id: user.id,
        autoreply: this.autoreplyForm.value.autoreply
      }
    });
    this.usersService.updateUsers(updatedUsers).subscribe((users) => {
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
    const updatedUsers = this.users.map(user => {
      return {
        id: user.id,
        autoreply: ''
      }
    });
    this.usersService.updateUsers(updatedUsers).subscribe(() => {
      this.autoreplyForm.reset();
    });
  }
}
