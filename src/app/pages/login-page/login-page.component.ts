import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  authErrorMessage = 'Login failed';
  authError = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.loginForm = this.formBuilder.group({
      password: ''
    });
  }
  login() {
    this.authService.login(this.loginForm.value.password).subscribe({
      next: (res: any) => {
        this.authError = false;
      },
      error: (err: Error) => {
        this.authError = true;
        this.authErrorMessage = err.message;
      }
    })
  }
}
