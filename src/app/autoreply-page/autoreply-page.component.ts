import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-autoreply-page',
  templateUrl: './autoreply-page.component.html',
  styleUrls: ['./autoreply-page.component.scss'],
})
export class AutoreplyPageComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }
}
