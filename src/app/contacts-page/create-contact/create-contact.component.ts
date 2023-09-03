import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss'],
})
export class CreateContactComponent {
  contactForm: FormGroup | undefined;

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService
  ) {}

  onSubmit() {
    if (this.contactForm?.valid) {
      const contact = new Contact(
        this.contactForm.value.name,
        this.contactForm.value.number
      );
      this.contactsService.createContact(contact).subscribe();
      this.contactForm.reset();
    }
  }
}
