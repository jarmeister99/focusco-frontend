import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cohort } from '../models/cohort.model';
import { MessagesService } from '../services/messages.service';
import { CohortsState, SelectCohortAction } from '../state/cohorts.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Select(CohortsState.selectedCohort) selectedCohort$!: Observable<Cohort | null>;
  @Select(CohortsState.cohorts) cohorts$!: Observable<Cohort[]>;

  constructor(private store: Store, private messagesService: MessagesService) { }

  onExportClick() {
    this.messagesService.exportMessages().subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  onSelectCohort(cohort: Cohort | null) {
    this.store.dispatch(new SelectCohortAction(cohort));
  }
}
