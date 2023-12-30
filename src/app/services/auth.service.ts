import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl = environment.API_BASE_URL + '/auth/check';
    authenticated = false;
    constructor(private http: HttpClient, private router: Router) {
    }
    isAuthenticated() {
        return this.authenticated;
    }
    getAuthHeaders() {
        return {
            headers: new HttpHeaders({
                'Authorization': localStorage.getItem('FOCUSCO_API_KEY') || ''
            })
        };
    }
    login(passcode: string): Observable<any> {
        return this.http.post(this.authUrl, { passcode }, this.getAuthHeaders()).pipe(
            map((res: any) => {
                if (res) {
                    this.authenticated = true;
                    this.router.navigate(['/threads']);
                    return res;
                }
                throw new Error('Login failed');
            })
        );
    }
}
