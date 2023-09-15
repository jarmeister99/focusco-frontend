import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactSelectorService } from 'src/app/services/contact-selector.service';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-multi-contact-selector',
  templateUrl: './multi-contact-selector.component.html',
  styleUrls: ['./multi-contact-selector.component.scss'],
})
export class MultiContactSelectorComponent {
  dropdownList: Contact[] = [];
  selectedItems: Contact[] = [];
  dropdownSettings: any;

  constructor(
    public readonly contactsService: ContactsService,
    public readonly contactSelectorService: ContactSelectorService
  ) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.dropdownList = contacts;
    });
    this.contactSelectorService.selectedContacts.subscribe((contacts) => {
      this.selectedItems = contacts;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 3,
    };
  }
  onItemSelect(item: any) {
    const contact = this.contactsService.getContactById(item._id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    this.contactSelectorService.addSelectedContact(contact);
  }
  onSelectAll(items: any) {
    const contactsToAdd: Contact[] = [];
    for (let item of items) {
      const contact = this.contactsService.getContactById(item._id);
      if (!contact) {
        throw new Error('Contact not found');
      }
      contactsToAdd.push(contact);
    }
    this.contactSelectorService.addMultipleSelectedContacts(contactsToAdd);
  }

  onDeSelect(item: any) {
    const contact = this.contactsService.getContactById(item._id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    this.contactSelectorService.removeSelectedContact(contact);
  }
  onDeSelectAll(items: any) {
    this.contactSelectorService.clearSelectedContacts();
  }
}
