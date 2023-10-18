import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MessagesService } from './services/messages.service';
import { ThreadSelectorService } from './services/thread-selector.service';
import { ThreadsService } from './services/threads.service';
import { ThreadSelectorComponent } from './threads-page/thread-selector/thread-selector.component';
import { ThreadViewerComponent } from './threads-page/thread-viewer/thread-viewer.component';
import { ThreadsPageComponent } from './threads-page/threads-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ThreadsPageComponent,
    ThreadSelectorComponent,
    ThreadViewerComponent
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
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: 'threads', component: ThreadsPageComponent },
    ]),
  ],
  providers: [ThreadsService, ThreadSelectorService, MessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
