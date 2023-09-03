import { Injectable, OnInit } from '@angular/core';
import { Contact, checkEquality } from '../models/contact.model';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root',
})
export class ContactSelectorService implements OnInit {
  contacts: Contact[] = [];
  selectedContacts: Contact[] = [];

  constructor(readonly contactsService: ContactsService) {
    this.selectedContacts = [];
  }

  ngOnInit() {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  addSelectedContact(contact: Contact) {
    // check to see if contact is already in selectedContacts using checkEquality
    if (
      !this.selectedContacts.some((selectedContact) =>
        checkEquality(selectedContact, contact)
      )
    ) {
      this.selectedContacts.push(contact);
    }
  }
  removeSelectedContact(contact: Contact) {
    // remove contact from selectedContacts if it is in selectedContacts
    this.selectedContacts = this.selectedContacts.filter(
      (selectedContact) => !checkEquality(selectedContact, contact)
    );
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
    this.selectedContacts = [];
  }
}
