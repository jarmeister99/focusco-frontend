import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutoreplyPageComponent } from './autoreply-page/autoreply-page.component';
import { BulkMessageSenderComponent } from './bulk-send-page/bulk-message-sender/bulk-message-sender.component';
import { BulkSendPageComponent } from './bulk-send-page/bulk-send-page.component';
import { MultiContactSelectorComponent } from './bulk-send-page/multi-contact-selector/multi-contact-selector.component';
import { MessageService } from './services/message.service';
import { ThreadSelectorService } from './services/thread-selector.service';
import { ThreadsService } from './services/threads.service';
import { MessageSenderComponent } from './threads-page/thread-selected-pane/message-sender/message-sender.component';
import { MessageComponent } from './threads-page/thread-selected-pane/message/message.component';
import { ThreadSelectedPaneComponent } from './threads-page/thread-selected-pane/thread-selected-pane.component';
import { ThreadSelectorEntryComponent } from './threads-page/thread-selector/thread-selector-entry/thread-selector-entry.component';
import { ThreadSelectorComponent } from './threads-page/thread-selector/thread-selector.component';
import { ThreadsPageComponent } from './threads-page/threads-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ThreadsPageComponent,
    ThreadSelectorComponent,
    ThreadSelectorEntryComponent,
    ThreadSelectedPaneComponent,
    MessageComponent,
    MessageSenderComponent,
    BulkSendPageComponent,
    MultiContactSelectorComponent,
    BulkMessageSenderComponent,
    AutoreplyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule

  ],
  providers: [ThreadsService, ThreadSelectorService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
