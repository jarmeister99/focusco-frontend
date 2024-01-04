import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {
    }
    getAuthHeaders() {
        return {
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('FOCUSCO_API_KEY') || ''
            })
        };
    }
}
