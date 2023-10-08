import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() contact: Contact | undefined = undefined;

  editPanelVisible: boolean = false;
  newContactName: string = '';

  constructor(private contactsService: ContactsService) { }

  deleteContact(contact: Contact) {
    this.contactsService.deleteContact(contact).subscribe();
  }
  editContact() {
    this.editPanelVisible = !this.editPanelVisible;
  }
  submitEditContact() {
    if (this.contact && this.newContactName !== '') {
      this.contactsService.updateContactName(this.contact, this.newContactName).subscribe();
    }
  }
}
