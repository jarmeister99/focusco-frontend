import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Cohort } from '../models/cohort.model';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { SimpleStateService } from '../services/simple-state.service';
import { WebsocketService } from '../services/websocket.service';
import { BulkSendComponentPayload } from '../shared_components/bulk-send-component/bulk-send-component.component';
import { CohortsState, SelectCohortAction } from '../state/cohorts.state';
import { CreateScheduledMessageAction } from '../state/scheduledMessages.state';
import { GetAllThreadsAction, SelectThreadAction, ThreadsState } from '../state/threads.state';

@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
  styleUrls: ['./threads-page.component.scss'],
  providers: [SimpleStateService]

})
export class ThreadsPageComponent implements OnInit {
  @Select(CohortsState.cohorts) cohorts$!: Observable<any>;
  @Select(CohortsState.selectedCohort) selectedCohort$!: Observable<Cohort>;
  @Select(CohortsState.selectedUsers) selectedUsers$!: Observable<User[]>;
  @Select(ThreadsState.threads) threads$!: Observable<Thread[]>;
  @Select(ThreadsState.selectedThread) selectedThread$!: Observable<Thread | undefined>;

  threadsInSelectedCohort$!: Observable<Thread[]>;

  constructor(private websocketService: WebsocketService, private store: Store) {
    this.threadsInSelectedCohort$ = combineLatest([this.selectedUsers$, this.threads$]).pipe(
      map(([selectedUsers, threads]) =>
        threads.filter(thread =>
          thread.participants.some(participant =>
            selectedUsers.some(user => user.id === participant.id)
          )
        )
      )
    );
  }
  ngOnInit(): void {
    this.store.dispatch(new GetAllThreadsAction()).subscribe();
    this.websocketService.onMessage().subscribe(() => {
      this.store.dispatch(new GetAllThreadsAction()).subscribe();
    });
  }
  onThreadSelected(thread: Thread) {
    this.store.dispatch(new SelectThreadAction(thread)).subscribe();
  }

  onBulkSend(payload: BulkSendComponentPayload) {
    const createScheduledMessagePayload = {
      receiverIds: payload.receivers.map((user) => user.id),
      triggerAt: payload.triggerAt,
      messagePayload: payload.messagePayload
    }
    this.store.dispatch(new CreateScheduledMessageAction(createScheduledMessagePayload))
  }

  onSelectCohort(cohort: Cohort) {
    this.store.dispatch(new SelectCohortAction(cohort)).subscribe();
  }

  threadsListSource$() {
    if (this.store.selectSnapshot(CohortsState.selectedCohort)) {
      return this.threadsInSelectedCohort$;
    } else {
      return this.threads$;
    }
  }

  hasThreads$() {
    return this.threadsListSource$().pipe(
      map((threads) => threads.length > 0)
    )
  }
}
