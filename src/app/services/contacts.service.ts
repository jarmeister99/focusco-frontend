import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, interval, startWith, switchMap, tap } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  apiUrl = 'http://localhost:3000/contacts';
  private contactsSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<
    Contact[]
  >([]);

  contacts: Contact[] = [];
  constructor(private http: HttpClient) {
    this.fetchContactsFromApi();
    const checkInterval$ = interval(5000);

    // Use switchMap to switch to a new observable whenever the timer emits
    checkInterval$
      .pipe(
        startWith(0), // Start with an initial emission to trigger the first API call
        switchMap(() => this.fetchContactsFromApi())
      )
      .subscribe((contacts) => {
        // if contacts is different from this.contactsSubject.value, then update this.contactsSubject
        if (!this.compareContactsLists(contacts, this.contactsSubject.value)) {
          this.contactsSubject.next(contacts);
        }
      });
  }

  private compareContactsLists(contacts1: Contact[], contacts2: Contact[]): boolean {
    if (contacts1.length !== contacts2.length) {
      return false;
    }
    for (let i = 0; i < contacts1.length; i++) {
      if (contacts1[i]._id !== contacts2[i]._id) {
        return false;
      }
    }
    return true;
  }

  getContactById(id: string): Contact | undefined {
    const foundContact = this.contactsSubject.value.find((c) => c._id === id);
    if (foundContact) {
      return foundContact;
    }
    else {
      return undefined;
    }
  }

  updateContactAutoreply(contact: Contact, autoreplyText: string): void {
    const body = {
      _id: contact._id,
      autoreplyText: autoreplyText,
    };
    this.http
      .post<Contact>(`${this.apiUrl}/autoreply`, body)
      .subscribe((updatedContact) => {
        const updatedContacts = this.contactsSubject.value.map((c) => {
          if (c._id === updatedContact._id) {
            return updatedContact;
          } else {
            return c;
          }
        });
        this.contactsSubject.next(updatedContacts);
      });
  }

  private fetchContactsFromApi(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact).pipe(
      tap((newContact) => {
        const updatedContacts = [...this.contactsSubject.value, newContact];
        this.contactsSubject.next(updatedContacts);
      }),
      catchError((error) => {
        console.error('Error creating contact:', error);
        throw error;
      })
    );
  }

  deleteContact(contact: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(`${this.apiUrl}/delete`, { _id: contact._id })
      .pipe(
        tap(() => {
          const updatedContacts = this.contactsSubject.value.filter(
            (c) => c._id !== contact._id
          );
          this.contactsSubject.next(updatedContacts);
        }),
        catchError((error) => {
          console.error('Error deleting contact:', error);
          throw error;
        })
      );
  }

  updateContactName(contact: Contact, name: string) {
    return this.http.post<Contact>(`${this.apiUrl}/updateNameByNumber`, { name: name, number: contact.number }).pipe(
      tap((updatedContact) => {
        const updatedContacts = this.contactsSubject.value.map((c) => {
          if (c._id === updatedContact._id) {
            return updatedContact;
          } else {
            return c;
          }
        });
        console.log(updatedContacts)
        this.contactsSubject.next(updatedContacts);
      }),
      catchError((error) => {
        console.error('Error updating contact name:', error);
        throw error;
      })
    );
  }
}
