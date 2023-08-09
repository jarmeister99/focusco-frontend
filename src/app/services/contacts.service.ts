import { Injectable } from '@angular/core';
import { Contact, getRandomContact } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    constructor() { }

    getContacts(): Contact[] {
        const contacts = []
        for (let i = 0; i < 5; i++) {
            contacts.push(getRandomContact());
        }
        return contacts;
    }
}
