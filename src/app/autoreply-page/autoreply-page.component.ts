import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-autoreply-page',
  templateUrl: './autoreply-page.component.html',
  styleUrls: ['./autoreply-page.component.scss'],
})
export class AutoreplyPageComponent implements OnInit {
  contacts: Contact[] = [];
  autoreplyForm: FormGroup | undefined;
  constructor(private contactsService: ContactsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
    this.autoreplyForm = this.formBuilder.group({
      autoreply: [''],
    });
  }

  onSubmit() {
    if (this.autoreplyForm?.valid) {
      this.contactsService.updateAllAutoreply(this.autoreplyForm.value.autoreply);
      this.autoreplyForm?.reset();
    }
  }
}
