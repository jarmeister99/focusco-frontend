import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl = environment.API_BASE_URL + '/auth/check';
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
