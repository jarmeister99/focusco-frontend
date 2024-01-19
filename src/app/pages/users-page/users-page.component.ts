import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cohort, User } from 'src/app/models/prisma.models';
import { CreateUserModalComponent } from 'src/app/shared-components/create-user-modal/create-user-modal.component';
import { CohortsState, SelectCohortAction } from 'src/app/state/cohorts.state';
import { GetAllUsersAction } from 'src/app/state/users.actions';
import { UsersState } from 'src/app/state/users.state';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  @Select(CohortsState.cohorts) cohorts$!: Observable<Cohort[]>;
  @Select(UsersState.users) users$!: Observable<User[]>;
  @Select(CohortsState.selectedUsers) selectedCohortUsers$!: Observable<User[]>;

  constructor(private store: Store, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAllUsersAction());
  }

  sortUsers(users: User[] | null) {
    if (!users) return [];
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }

  onSelectCohort(cohort: Cohort | null) {
    this.store.dispatch(new SelectCohortAction(cohort)).subscribe();
  }

  openCreateUserModal() {
    this.dialog.open(CreateUserModalComponent, { autoFocus: false });
  }
}
