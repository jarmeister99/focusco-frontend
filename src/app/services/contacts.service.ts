import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
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

  private fetchContactsFromApi(): void {
    this.http
      .get<Contact[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching contacts:', error);
          return [];
        }),
        tap((contacts) => {
          this.contactsSubject.next(contacts);
        })
      )
      .subscribe();
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
}
