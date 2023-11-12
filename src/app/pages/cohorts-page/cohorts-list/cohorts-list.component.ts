import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cohort } from 'src/app/models/cohort.model';

export type ControlStyle = 'buttons' | 'card';

@Component({
  selector: 'app-cohorts-list',
  templateUrl: './cohorts-list.component.html',
  styleUrls: ['./cohorts-list.component.scss']
})
export class CohortsListComponent {
  @Input() cohorts$!: Observable<Cohort[]>;
  @Input() selectedCohort$!: Observable<Cohort | undefined>;
  @Input() controlStyle: ControlStyle = 'buttons';
  @Input() layout: 'row' | 'column' = 'row';
  @Output() selectCohort = new EventEmitter<Cohort>();
  @Output() deleteCohort = new EventEmitter<Cohort>();
  @Output() exportCohort = new EventEmitter<Cohort>();

  constructor() { }

  onCohortClick(cohort: Cohort) {
    this.selectCohort.emit(cohort);
  }
  onCardClick(cohort: Cohort) {
    if (this.controlStyle !== 'card') return;
    this.selectCohort.emit(cohort);
  }
  onDeleteClick(cohort: Cohort) {
    this.deleteCohort.emit(cohort);
  }
  onExportClick(cohort: Cohort) {
    this.exportCohort.emit(cohort);
  }

  isSelected(cohort: Cohort) {
    return this.selectedCohort$.pipe(
      map(selectedCohort => {
        return selectedCohort?.id === cohort.id;
      })
    );
  }
}
