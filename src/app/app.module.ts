import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutoreplyBoxComponent } from './autoreply-page/autoreply-box/autoreply-box.component';
import { AutoreplyPageComponent } from './autoreply-page/autoreply-page.component';
import { BulkSendPageComponent } from './bulk-send-page/bulk-send-page.component';
import { MultiContactSelectorComponent } from './bulk-send-page/multi-contact-selector/multi-contact-selector.component';
import { ContactListComponent } from './contacts-page/contact-list/contact-list.component';
import { ContactComponent } from './contacts-page/contact/contact.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { CreateContactComponent } from './contacts-page/create-contact/create-contact.component';
import { SendMessageComponent } from './library/send-message/send-message.component';
import { MessageService } from './services/message.service';
import { ThreadSelectorService } from './services/thread-selector.service';
import { ThreadsService } from './services/threads.service';
import { ContactSelectorComponent } from './threads-page/thread-creator/contact-selector/contact-selector.component';
import { ThreadCreatorComponent } from './threads-page/thread-creator/thread-creator.component';
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
    BulkSendPageComponent,
    MultiContactSelectorComponent,
    AutoreplyPageComponent,
    ContactsPageComponent,
    ContactComponent,
    CreateContactComponent,
    ContactListComponent,
    ThreadCreatorComponent,
    ContactSelectorComponent,
    AutoreplyBoxComponent,
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
    FormsModule,
    HttpClientModule,
    SendMessageComponent
  ],
  providers: [ThreadsService, ThreadSelectorService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
