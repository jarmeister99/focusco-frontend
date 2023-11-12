import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged, interval, map, startWith, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/user.model';
import { CreateUserPayload, EditUserPayload } from '../state/users.actions';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    API_URL = environment.API_BASE_URL + '/users';

    constructor(private http: HttpClient) { }

    getAllUsers() {
        return this.http.get(this.API_URL) as Observable<User[]>;
    }

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

    updateUser(id: number, user: EditUserPayload) {
        return this.http.put(`${this.API_URL}/${id}`, user) as Observable<User>;
    }

    updateUsers(users: EditUserPayload[]) {
        return this.http.put(this.API_URL, users) as Observable<User[]>;
    }

    createUser(createUserPayload: CreateUserPayload) {
        return this.http.post(this.API_URL, createUserPayload) as Observable<User>;
    }

    deleteUser(id: number) {
        return this.http.delete(`${this.API_URL}/${id}`) as Observable<User>;
    }
}
