import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  isLoading = signal(false);
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  passwordForm!: FormGroup;
  errorMessage = signal('');
  countdown = 60;
  userEmail = signal<string>('');
  currentStep = signal<'email' | 'otp' | 'newPassword'>('email');
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  ngOnInit(): void {
    this.initForm();
    initFlowbite();
  }
  initForm(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this.fb.group({
      d1: ['', [Validators.required]],
      d2: ['', [Validators.required]],
      d3: ['', [Validators.required]],
      d4: ['', [Validators.required]],
      d5: ['', [Validators.required]],
      d6: ['', [Validators.required]],
    });

    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', Validators.required],
      },
      {
        validators: (form: FormGroup) =>
          form.get('password')?.value === form.get('newPassword')?.value
            ? null
            : { mismatch: true },
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  showPassword() {
    return !this.hidePassword();
  }

  showConfirmPassword() {
    return !this.hideConfirmPassword();
  }

  getFieldError(field: string) {
    const control =
      this.emailForm.get(field) || this.otpForm.get(field) || this.passwordForm.get(field);
    if (!control || !control.touched) return null;

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('minlength'))
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
    if (control.hasError('email')) return 'Invalid email format';
    if (control.hasError('pattern')) return 'Invalid format';
    if (field === 'newPassword' && this.passwordForm.hasError('mismatch'))
      return 'Passwords do not match';

    return null;
  }

  emailSubmit() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');
    const formData = this.emailForm.value;
    console.log('Email Data:', formData);
    this.userEmail.set(formData.email);
    setTimeout(() => {
      this.isLoading.set(false);
      this.currentStep.set('otp');
    }, 1000);
  }

  otpSubmit(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    const resetCode = Object.values(this.otpForm.value).join('');
    const payload = { resetCode };
    console.log('OTP Payload:', payload);

    setTimeout(() => {
      this.isLoading.set(false);
      this.currentStep.set('newPassword');
    }, 1000);
  }

  passwordSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const payload = {
      email: this.userEmail,
      newPassword: this.passwordForm.value.newPassword,
    };

    console.log('Password :', payload);
// test form only changed call api
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Password reset successful!');
      this.router.navigate(['/auth/login']);
    }, 1000);
  }
}
