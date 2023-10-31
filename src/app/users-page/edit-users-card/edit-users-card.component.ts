import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import User from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-users-card',
  templateUrl: './edit-users-card.component.html',
  styleUrls: ['./edit-users-card.component.scss']
})
export class EditUsersCardComponent implements OnInit {
  @Input() user!: User;

  editUserForm?: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {

  }
  ngOnInit(): void {
    // these fields are a subset of the options available on the user model
    const formControls = {
      name: { value: this.user.name, disabled: false },
      number: { value: this.user.number, disabled: true },
      autoreply: { value: this.user.autoreply, disabled: false },
    }

    this.editUserForm = this.formBuilder.group(formControls);
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
    this.usersService.updateUser(this.user.id, this.editUserForm?.value).subscribe((user) => {
      this.editUserForm?.reset();
    });
  }
}
