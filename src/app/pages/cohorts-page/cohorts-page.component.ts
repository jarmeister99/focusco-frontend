import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Cohort, User } from 'src/app/models/prisma.models';
import { CreateCohortModalComponent } from 'src/app/shared-components/create-cohort-modal/create-cohort-modal.component';
import { AddUsersToCohortAction, CohortsState, DeleteCohortAction, ExportCohortMessagesAction, RemoveUserFromCohortAction, SelectCohortAction } from 'src/app/state/cohorts.state';
import { UsersState } from 'src/app/state/users.state';

@Component({
  selector: 'app-cohorts-page',
  templateUrl: './cohorts-page.component.html',
  styleUrls: ['./cohorts-page.component.scss']
})
export class CohortsPageComponent {
  @Select(CohortsState.cohorts) cohorts$!: Observable<Cohort[]>;
  @Select(CohortsState.selectedCohort) selectedCohort$!: Observable<Cohort>;
  @Select(CohortsState.selectedUsers) selectedUsers$!: Observable<User[]>;
  @Select(UsersState.users) users$!: Observable<User[]>;

  usersNotInGrid$: Observable<User[]> = new Observable<User[]>();

  constructor(private store: Store, private dialog: MatDialog) {
    this.usersNotInGrid$ = combineLatest([
      this.users$.pipe(startWith([])),
      this.selectedUsers$.pipe(startWith([]))
    ]).pipe(
      map(([users, selectedUsers]) => {
        const selectedUserIds = new Set(selectedUsers.map(user => user.id));
        return users.filter(user => !selectedUserIds.has(user.id));
      })
    );
  }

  onAddUsers(users: User[]) {
    const selectedCohortId = this.store.selectSnapshot(CohortsState.selectedCohort)?.id;
    if (selectedCohortId) {
      this.store.dispatch(new AddUsersToCohortAction(users, selectedCohortId)).subscribe();
    }
  }
  onRemoveUser(user: User) {
    const selectedCohortId = this.store.selectSnapshot(CohortsState.selectedCohort)?.id;
    if (selectedCohortId) {
      this.store.dispatch(new RemoveUserFromCohortAction(user.id, selectedCohortId)).subscribe();
    }
  }

  onSelectCohort(cohort: Cohort | null) {
    this.store.dispatch(new SelectCohortAction(cohort)).subscribe();
  }

  onDeleteCohort(cohort: Cohort) {
    if (window.confirm(`Are you sure you want to delete this cohort?`)) {
      this.store.dispatch(new DeleteCohortAction(cohort.id)).subscribe();
    }
  }
  onExportCohort(cohort: Cohort) {
    this.store.dispatch(new ExportCohortMessagesAction(cohort.id)).subscribe();
  }

  openCreateCohortModal() {
    this.dialog.open(CreateCohortModalComponent);
  }
}
