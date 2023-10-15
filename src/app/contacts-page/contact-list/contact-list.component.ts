import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(public readonly contactsService: ContactsService) { }
  ngOnInit() {
    this.contactsService.getContacts().subscribe((contacts) => {
      if (!(this.contactsService.compareContactsLists(contacts, this.contacts))) {
        this.contacts = contacts;
      }
      else if (this.contacts.length === 0) {
        this.contacts = contacts;
      }
    });
  }
}
