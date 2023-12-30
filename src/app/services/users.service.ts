import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/user.model';
import { CreateUserPayload, EditUserPayload } from '../state/users.actions';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    API_URL = environment.API_BASE_URL + '/users';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAllUsers() {
        return this.http.get(this.API_URL, this.authService.getAuthHeaders()) as Observable<User[]>;
    }

    getOwner() {
        return this.http.get(`${this.API_URL}/owner`, this.authService.getAuthHeaders()) as Observable<User>;
    }

    getUsers() {
        return this.http.get(this.API_URL, this.authService.getAuthHeaders()) as Observable<User[]>;
    }

    updateUser(id: number, user: EditUserPayload) {
        return this.http.put(`${this.API_URL}/${id}`, user, this.authService.getAuthHeaders()) as Observable<User>;
    }

    updateUsers(users: EditUserPayload[]) {
        return this.http.put(this.API_URL, users, this.authService.getAuthHeaders()) as Observable<User[]>;
    }

    createUser(createUserPayload: CreateUserPayload) {
        return this.http.post(this.API_URL, createUserPayload, this.authService.getAuthHeaders()) as Observable<User>;
    }

    deleteUser(id: number) {
        return this.http.delete(`${this.API_URL}/${id}`, this.authService.getAuthHeaders()) as Observable<User>;
    }
}
