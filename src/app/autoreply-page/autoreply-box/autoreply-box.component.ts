import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-autoreply-box',
  templateUrl: './autoreply-box.component.html',
  styleUrls: ['./autoreply-box.component.scss'],
})
export class AutoreplyBoxComponent implements OnInit {
  @Input() contact?: Contact;

  contactForm: FormGroup | undefined;

  constructor(
    private contactsService: ContactsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      autoreply: [this.contact?.autoreplyText, Validators.required],
    });
  }

  updateAutoreply(autoreplyText: string): void {
    if (this.contact) {
      this.contactsService.updateContactAutoreply(this.contact, autoreplyText);
    }
  }

  hasAutoReply(): boolean {
    return (
      this.contact?.autoreplyText !== undefined &&
      this.contact?.autoreplyText !== ''
    );
  }

  onSubmit() {
    if (this.contactForm?.valid) {
      this.updateAutoreply(this.contactForm.value.autoreply);
    }
  }
}
