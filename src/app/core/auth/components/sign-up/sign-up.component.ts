import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ValidationMessageComponent } from "../../../../shared/components/validation-message/validation-message.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  errorMessage = '';
  isSubmitting = false;
  private readonly authservice = inject(AuthService);
  private readonly Router = inject(Router);

  authForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    rePassword: new FormControl(''),
    acceptTerms: new FormControl(false, [Validators.requiredTrue])
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {

    return control.get('password')?.value === control.get('rePassword')?.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.errorMessage = ''; // reset error message
    if (this.authForm.valid) {
      this.authservice.register(this.authForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isSubmitting = false;
          this.Router.navigate(['/login-user']);
        },
        error: (err) => {
          this.isSubmitting = false;

          console.log(err);
          if (err.error?.message?.includes('email already exists') ||
              err.status === 409 ||
              err.error?.code === 'EMAIL_EXISTS') {
            this.errorMessage = 'An account with this email already exists.';
          } else {
            // Generic error message for other errors
            this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
          }
        }
      })
    }else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.authForm.controls).forEach(key => {
        const control = this.authForm.get(key);
        control?.markAsTouched();
      });
    }
  }




  showPassword = false;
  showrePassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglerePassword() {
    this.showrePassword = !this.showrePassword;
  }

}
