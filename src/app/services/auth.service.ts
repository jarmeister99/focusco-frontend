import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl = 'http://lofilovers.com:3000/api/auth/check';
    authenticated = true;
    constructor(private http: HttpClient, private router: Router) {

    }
    isAuthenticated() {
        return this.authenticated;
    }
    login(passcode: string) {
        this.http.post(this.authUrl, { passcode }).subscribe((res: any) => {
            if (res) {
                this.authenticated = true;

                // use router to navigate to /threads
                this.router.navigate(['/threads']);
            }
        });
    }
}
