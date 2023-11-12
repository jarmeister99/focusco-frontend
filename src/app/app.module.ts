import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material/form-field';

import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { NgxsModule } from '@ngxs/store';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { canActivate } from './guards/auth-guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditUsersCardComponent } from './pages/users-page/edit-users-card/edit-users-card.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { ScheduledMessageComponent } from './schedule-page/scheduled-message/scheduled-message.component';
import { MessagesService } from './services/messages.service';
import { ScheduleMessagesService } from './services/schedule.messages.service';
import { ThreadSelectorService } from './services/thread-selector.service';
import { ThreadsService } from './services/threads.service';
import { UsersService } from './services/users.service';
import { WebsocketService } from './services/websocket.service';
import { BulkAutoreplyComponent } from './shared_components/bulk-autoreply/bulk-autoreply.component';
import { MessageCreatorComponent } from './shared_components/message-creator/message-creator.component';
import { MessageListComponent } from './shared_components/message-list/message-list.component';
import { MessageComponent } from './shared_components/message/message.component';
import { TimePickerComponent } from './shared_components/time-picker/time-picker.component';
import { ScheduledMessagesState } from './state/scheduledMessages.state';
import { ThreadsState } from './state/threads.state';
import { UsersState } from './state/users.state';
import { ThreadSelectorComponent } from './threads-page/thread-selector/thread-selector.component';
import { ThreadViewerComponent } from './threads-page/thread-viewer/thread-viewer.component';
import { ThreadsPageComponent } from './threads-page/threads-page.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CohortUsersGridComponent } from './pages/cohorts-page/cohort-users-grid/cohort-users-grid.component';
import { CohortsListComponent } from './pages/cohorts-page/cohorts-list/cohorts-list.component';
import { CohortsPageComponent } from './pages/cohorts-page/cohorts-page.component';
import { BulkSendComponentComponent } from './shared_components/bulk-send-component/bulk-send-component.component';
import { CreateCohortModalComponent } from './shared_components/create-cohort-modal/create-cohort-modal.component';
import { CreateUserModalComponent } from './shared_components/create-user-modal/create-user-modal.component';
import { EditScheduledMessageModalComponent } from './shared_components/edit-scheduled-message-modal/edit-scheduled-message-modal';
import { MultiselectUsersComponent } from './shared_components/multiselect-users/multiselect-users.component';
import { CohortsState } from './state/cohorts.state';
import { UserNoteModalComponent } from './shared_components/user-note-modal/user-note-modal.component';
import { AutoreplyBadgeComponent } from './shared-components/autoreply-badge/autoreply-badge.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreadsPageComponent,
    ThreadSelectorComponent,
    ThreadViewerComponent,
    MessageListComponent,
    MessageComponent,
    MessageCreatorComponent,
    EditUsersCardComponent,
    UsersPageComponent,
    BulkAutoreplyComponent,
    TimePickerComponent,
    SchedulePageComponent,
    ScheduledMessageComponent,
    OrderByPipe,
    LoginPageComponent,
    EditScheduledMessageModalComponent,
    CohortsPageComponent,
    CohortsListComponent,
    CohortUsersGridComponent,
    MultiselectUsersComponent,
    CreateCohortModalComponent,
    CreateUserModalComponent,
    BulkSendComponentComponent,
    UserNoteModalComponent,
    AutoreplyBadgeComponent,
  ],
  imports: [
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    EmojiModule,
    PickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'threads', component: ThreadsPageComponent, canActivate: [canActivate] },
      { path: 'users', component: UsersPageComponent, canActivate: [canActivate] },
      { path: 'schedule', component: SchedulePageComponent, canActivate: [canActivate] },
      { path: 'cohorts', component: CohortsPageComponent, canActivate: [canActivate] },
    ]),
    NgxsModule.forRoot([UsersState, ThreadsState, ScheduledMessagesState, CohortsState], {
    }),
  ],
  providers: [ThreadsService, ThreadSelectorService, MessagesService, UsersService, ScheduleMessagesService, WebsocketService],
  bootstrap: [AppComponent],
})
export class AppModule {

}
