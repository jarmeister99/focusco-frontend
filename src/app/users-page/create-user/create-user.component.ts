import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  createUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.createUserForm = this.formBuilder.group({
      name: '',
      number: ''
    });
  }
  createUser() {
    this.usersService.createUser(this.createUserForm.value).subscribe(() => {
      this.createUserForm.reset();
    });
  }
}
