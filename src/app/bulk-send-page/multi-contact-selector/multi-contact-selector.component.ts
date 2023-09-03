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
  ) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.dropdownList = contacts;
    });

    this.selectedItems = this.contactSelectorService.selectedContacts;
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
    this.contactSelectorService.addSelectedContact(item);
  }
  onSelectAll(items: any) {
    this.contactSelectorService.addMultipleSelectedContacts(items);
  }
  onDeSelect(item: any) {
    this.contactSelectorService.removeSelectedContact(item);
  }
  onDeSelectAll(items: any) {
    this.contactSelectorService.clearSelectedContacts();
  }
}
