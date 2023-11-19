import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cohort } from 'src/app/models/cohort.model';


@Component({
  selector: 'app-cohorts-list',
  templateUrl: './cohorts-list.component.html',
  styleUrls: ['./cohorts-list.component.scss']
})
export class CohortsListComponent {
  @Input() cohorts: Cohort[] | null = [];

  @Output() selectCohort = new EventEmitter<Cohort | null>();
  @Output() deleteCohort = new EventEmitter<Cohort>();
  @Output() exportCohort = new EventEmitter<Cohort>();

  selectedCohort: Cohort | null = null;

  tooltipShowDelay = 300;

  constructor() { }

  private onSelect(cohort: Cohort) {
    if (this.selectedCohort === cohort) {
      this.selectedCohort = null;
      this.selectCohort.emit(null);
    }
    else {
      this.selectedCohort = cohort;
      this.selectCohort.emit(cohort);
    }
  }

  getListItemClasses(cohort: Cohort) {
    return {
      'selected': this.selectedCohort === cohort,
      'no-user-select': true,
      'list-item': true,
    }
  }

  getListContainerClasses() {
    return {
      'list-container': true,
      'flex-column': true,
    }
  }

  getCardTitleClasses() {
    return {
      'clamp-1-line': true,
    }

  }
  getCardSubtitleClasses() {
    return {
      'clamp-2-line': true,
    }
  }

  onSelectClick(cohort: Cohort) {
    if (this.selectedCohort !== cohort) {
      this.selectedCohort = cohort;
      this.selectCohort.emit(cohort);
    }
  }
  onDeleteClick(cohort: Cohort) {
    if (this.selectedCohort === cohort) {
      this.selectedCohort = null;
    }
    this.deleteCohort.emit(cohort);
  }
  onExportClick(cohort: Cohort) {
    this.exportCohort.emit(cohort);
  }

}
