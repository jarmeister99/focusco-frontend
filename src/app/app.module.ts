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
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { canActivate } from './guards/auth-guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { ScheduledMessageComponent } from './schedule-page/scheduled-message/scheduled-message.component';
import { MessagesService } from './services/messages.service';
import { ScheduleMessagesService } from './services/schedule.messages.service';
import { ThreadSelectorService } from './services/thread-selector.service';
import { ThreadsService } from './services/threads.service';
import { UsersService } from './services/users.service';
import { BulkAutoreplyComponent } from './shared_components/bulk-autoreply/bulk-autoreply.component';
import { MessageCreatorComponent } from './shared_components/message-creator/message-creator.component';
import { MessageListComponent } from './shared_components/message-list/message-list.component';
import { MessageComponent } from './shared_components/message/message.component';
import { MultiContactSelectorComponent } from './shared_components/multi-contact-selector/multi-contact-selector.component';
import { TimePickerComponent } from './shared_components/time-picker/time-picker.component';
import { ThreadSelectorComponent } from './threads-page/thread-selector/thread-selector.component';
import { ThreadViewerComponent } from './threads-page/thread-viewer/thread-viewer.component';
import { ThreadsPageComponent } from './threads-page/threads-page.component';
import { CreateUserComponent } from './users-page/create-user/create-user.component';
import { EditUsersCardComponent } from './users-page/edit-users-card/edit-users-card.component';
import { UsersPageComponent } from './users-page/users-page.component';



@NgModule({
  declarations: [
    AppComponent,
    ThreadsPageComponent,
    ThreadSelectorComponent,
    ThreadViewerComponent,
    MessageListComponent,
    MessageComponent,
    MessageCreatorComponent,
    MultiContactSelectorComponent,
    EditUsersCardComponent,
    UsersPageComponent,
    BulkAutoreplyComponent,
    TimePickerComponent,
    SchedulePageComponent,
    ScheduledMessageComponent,
    OrderByPipe,
    CreateUserComponent,
    LoginPageComponent,

  ],
  imports: [
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
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'threads', component: ThreadsPageComponent, canActivate: [canActivate] },
      { path: 'users', component: UsersPageComponent, canActivate: [canActivate] },
      { path: 'schedule', component: SchedulePageComponent, canActivate: [canActivate] },
    ]),
  ],
  providers: [ThreadsService, ThreadSelectorService, MessagesService, UsersService, ScheduleMessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {

}
