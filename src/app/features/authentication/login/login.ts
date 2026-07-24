import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ILoginRequest } from '../../../core/models/ILoginRequest';
import { ILoginResponse } from '../../../core/models/ILoginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  userName = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  login(form: NgForm): void {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request: ILoginRequest = {
      userName: this.userName,
      password: this.password
    };

    this.authService.login(request).subscribe({
      next: (response: any) => {
debugger
        // Save JWT Token
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        // Save User Details
        // localStorage.setItem('user', JSON.stringify(response.data));

        // // Optional: Save additional information
        // localStorage.setItem('expiresIn', response.expiresIn.toString());
        // localStorage.setItem('role', response.data.role);

        console.log('Login Successful');
        console.log(response);

        this.isLoading = false;

        // Navigate to Dashboard
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password';
        console.error(err);
      }
    });
  }
}