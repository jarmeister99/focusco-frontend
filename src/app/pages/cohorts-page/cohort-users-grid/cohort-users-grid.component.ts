import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/prisma.models';
import { CreateUserModalComponent } from 'src/app/shared-components/create-user-modal/create-user-modal.component';

@Component({
  selector: 'app-cohort-users-grid',
  templateUrl: './cohort-users-grid.component.html',
  styleUrls: ['./cohort-users-grid.component.scss']
})
export class CohortUsersGridComponent {
  displayedColumns: string[] = ['name', 'number', 'controls'];

  @Input() users$!: Observable<User[]>;
  @Input() usersNotInGrid$!: Observable<User[]>;

  @Output() addUsers = new EventEmitter<User[]>();
  @Output() removeUser = new EventEmitter<User>();


  shouldShowAddUserComponent: boolean = false;

  constructor(private store: Store, private dialog: MatDialog) { }


  onClickRemoveUser(user: User) {
    this.removeUser.emit(user);
  }

  onClickAddUsers(userIds: number[]) {
    const users = this.store.selectSnapshot(state => state.users.users).filter((user: User) => userIds.includes(user.id));
    this.addUsers.emit(users);
  }

  toggleAddUserComponent() {
    this.shouldShowAddUserComponent = !this.shouldShowAddUserComponent;
  }

  openCreateUserModal() {
    this.dialog.open(CreateUserModalComponent);
  }

}
