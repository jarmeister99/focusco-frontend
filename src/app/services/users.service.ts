import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged, interval, map, startWith, switchMap } from 'rxjs';
import User from '../models/user.model';

interface CreateUserPayload {
    name: string;
    number: string;
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    API_URL = 'http://lofilovers.com:3000/api/users';

    constructor(private http: HttpClient) { }

    getUsersOnInterval$() {
        return interval(500) // emits a value every 5 seconds
            .pipe(
                startWith(0), // starts immediately
                switchMap(() => this.getUsers()), // switches to new inner observable when source emits, canceling any previous in-flight requests
                map(users => JSON.stringify(users)), // maps the users to a JSON string
                distinctUntilChanged(), // only emits when the current value is different than the last
                map(usersString => JSON.parse(usersString)) // maps the JSON string back to an array of users
            );
    }

    getOwner() {
        return this.http.get(`${this.API_URL}/owner`) as Observable<User>;
    }

    getUsers() {
        return this.http.get(this.API_URL) as Observable<User[]>;
    }

    updateUser(id: number, user: Partial<User>) {
        return this.http.put(`${this.API_URL}/${id}`, user) as Observable<User>;
    }

    updateUsers(users: Partial<User>[]) {
        return this.http.put(this.API_URL, users) as Observable<User[]>;
    }

    createUser(createUserPayload: CreateUserPayload) {
        return this.http.post(this.API_URL, createUserPayload) as Observable<User>;
    }
}
