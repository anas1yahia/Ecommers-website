import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationMessageComponent } from '../../../../shared/components/validation-message/validation-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ValidationMessageComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = false;
  errorMessage = '';
  isSubmitting = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false)
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('LOGIN SUCCESS - Full response:', response);
          console.log('Response structure:', Object.keys(response));

          // Check for token
          const token = response.token || response.accessToken || response.access_token;
          console.log('Found token?', !!token);

          if (token) {
            this.authService.saveToken(token);

            // Check for user data
            console.log('User data in response:', response.user || response.userData || null);

            // Try to store user data if available
            if (response.user) {
              this.authService.saveUserData(response.user);
            }

            // Redirect to home
            this.router.navigate(['/home']);
          } else {
            this.isSubmitting = false;
            this.errorMessage = "No authentication token found in response";
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Login error details:', err);

          if (err.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = err.error?.message || 'Login failed. Please try again.';
          }
        }
      });
    }
  }
}
