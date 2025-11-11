import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from 'auth-lib';
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
  private readonly _auth=inject(Auth);
  isLoading = signal(false);
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  passwordForm!: FormGroup;
  errorMessage = signal('');
  countdown = signal(60);
  contDownInterval: any;
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
       password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ )]],
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
// email submit
 emailSubmit() {
  if (this.emailForm.invalid) {
    this.emailForm.markAllAsTouched();
    return;
  }

  this.isLoading.set(true);
  this.errorMessage.set('');

  this._auth.forgotPassword(this.emailForm.value).subscribe({
    next: (res) => {
      this.isLoading.set(false);
      if (res.message === 'success') {
      this.userEmail.set(this.emailForm.value.email);
        this.currentStep.set('otp');
        this.statCountDown();
      }
    },
    error: (err) => {
      this.isLoading.set(false);
      this.errorMessage.set(err.error?.message || 'An error occurred. Please try again.');
    }
  });
}


  otpSubmit(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');
      const otpCode = Object.values(this.otpForm.value).join('');
      this._auth.verifyResetCode({ resetCode:otpCode}).subscribe({
      next:(res)=>{
        this.isLoading.set(false);
        if(res.status==='Success'){
          this.currentStep.set('newPassword');
        }

      },
      error:(err)=>{
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.stutus || 'An error occurred. Please try again.');
      }

    })
  }
  //  start countdown for otp
statCountDown() {
    this.countdown.set(60);
    clearInterval(this.contDownInterval);
    this.contDownInterval = setInterval(() => {
      this.countdown.update((v) => v - 1);
      if (this.countdown() <= 0) {
        clearInterval(this.contDownInterval);
      }
    }, 1000);
}
// recentCode for otp
resentode(){
  this.isLoading.set(true);
  this.errorMessage.set('');
  this._auth.forgotPassword(this.emailForm.value).subscribe({
    next: (res) => {
      this.isLoading.set(false);
      if (res.message === 'success') {
        this.statCountDown();
      }
    },
    error: (err) => {
      this.isLoading.set(false);
      this.errorMessage.set(err.error?.message || 'OTP IS WRONG. Please try again.');
    }
  });
}
//Edit Email for otp
editEmail(){
  this.currentStep.set('email');
}

// Password Submit
  passwordSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');
     const payload = {
    email: this.userEmail(),
    newPassword: this.passwordForm.get('password')?.value
  };

    this._auth.resetPassword(payload).subscribe({
      next:(res)=>{
        this.isLoading.set(false);
        if(res.message==='success'){
           this.router.navigate(['/auth/login']);
        }
      },
      error:(err)=>{
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'An error occurred. Please try again.');
      }
    });
  }
 getShortError(msg: string) {
  const maxLength = 30;
  return msg.length > maxLength ? msg.slice(0, maxLength) + '...Is Wrong' : msg;

}
closeError() {
  this.errorMessage = signal('');
  this.emailForm.reset();
  this.otpForm.reset();
  this.passwordForm.reset();
}
}
