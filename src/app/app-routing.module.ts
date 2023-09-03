import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoreplyPageComponent } from './autoreply-page/autoreply-page.component';
import { BulkSendPageComponent } from './bulk-send-page/bulk-send-page.component';
import { ThreadsPageComponent } from './threads-page/threads-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';

const routes: Routes = [
  { path: 'threads', component: ThreadsPageComponent },
  { path: 'bulk-send', component: BulkSendPageComponent },
  {
    path: 'autoreply', component: AutoreplyPageComponent
  },
  {
    path: 'contacts', component: ContactsPageComponent
  },
  { path: '', redirectTo: '/threads', pathMatch: 'full' }, // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
