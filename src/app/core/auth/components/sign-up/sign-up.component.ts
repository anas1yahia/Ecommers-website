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
  private readonly authservice = inject(AuthService)

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
    if (this.authForm.valid) {
      this.authservice.register(this.authForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
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
