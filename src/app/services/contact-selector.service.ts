import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact, checkEquality } from '../models/contact.model';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root',
})
export class ContactSelectorService implements OnInit {
  contacts: Contact[] = [];
  selectedContacts: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);

  constructor(readonly contactsService: ContactsService) {
  }

  ngOnInit() {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  addSelectedContact(contact: Contact) {
    // check to see if contact is already in selectedContacts using checkEquality
    // if it is not, add it to selectedContacts
    if (!this.selectedContacts.value.some((selectedContact) => checkEquality(selectedContact, contact))) {
      this.selectedContacts.next([...this.selectedContacts.value, contact]);
    }
  }
  removeSelectedContact(contact: Contact) {
    // remove contact from selectedContacts if it is in selectedContacts
    if (this.selectedContacts.value.some((selectedContact) => checkEquality(selectedContact, contact))) {
      this.selectedContacts.next(this.selectedContacts.value.filter((selectedContact) => !checkEquality(selectedContact, contact)));
    }
  }
  addMultipleSelectedContacts(contacts: Contact[]) {
    // add multiple contacts to selectedContacts
    contacts.forEach((contact) => {
      this.addSelectedContact(contact);
    });
  }
  removeMultipleSelectedContacts(contacts: Contact[]) {
    // remove multiple contacts from selectedContacts
    contacts.forEach((contact) => {
      this.removeSelectedContact(contact);
    });
  }
  clearSelectedContacts() {
    // clear selectedContacts
    this.selectedContacts.next([]);
  }
}
