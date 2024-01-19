import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto, DeleteUserAPIResponse, DeleteUserDto, EditUserDto, GetAllUsersAPIResponse } from 'focusco-lib';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    API_URL = environment.API_BASE_URL + '/users';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAllUsers() {
        return this.http.get<GetAllUsersAPIResponse>(this.API_URL, this.authService.getAuthHeaders());
    }

    createUser(payload: CreateUserDto) {
        return this.http.post<CreateUserDto>(this.API_URL, payload, this.authService.getAuthHeaders());
    }

    editUser(payload: EditUserDto) {
        return this.http.put<EditUserDto>(this.API_URL + '/' + payload.userId, payload, this.authService.getAuthHeaders());
    }

    deleteUser(payload: DeleteUserDto) {
        return this.http.delete<DeleteUserAPIResponse>(this.API_URL + '/' + payload.userId, this.authService.getAuthHeaders());
    }

}
