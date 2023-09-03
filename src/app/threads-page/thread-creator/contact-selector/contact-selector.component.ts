import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-selector',
  templateUrl: './contact-selector.component.html',
  styleUrls: ['./contact-selector.component.scss'],
})
export class ContactSelectorComponent implements OnInit {
  options: any[] = [];
  contacts: Contact[] = [];
  selectedContactId: string | undefined = undefined; // Holds the value of the selected option

  // create an event emitter to emit the selected contact
  @Output() contactSelected = new EventEmitter<Contact>();

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
      this.options = this.createDropdownOptions(contacts);
    });
  }

  createDropdownOptions(contacts: Contact[]) {
    if (contacts.length > 0) {
      this.selectedContactId = contacts[0]._id;
      this.onSelect(this.selectedContactId);
      return contacts.map((contact) => {
        return { label: contact.name, value: contact._id };
      });
    } else {
      return [];
    }
  }
  onSelect(event: any) {
    // find the contact that matches the selected id
    const selectedContact = this.contacts.find(
      (contact) => contact._id === event
    );
    // emit the selected contact
    this.contactSelected.emit(selectedContact);
  }
}
