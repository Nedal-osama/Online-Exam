import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initeLogin();
    initFlowbite();
  }
  initeLogin(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  getFieldError(field: string): string | null {
    const control = this.loginForm.get(field);
    if (!control || !control.touched) return null;
    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('email')) return 'Invalid email address';
    return null;
  }
  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    const formData = this.loginForm.value;
    console.log('login Data :', formData);

    // API call
  }
}
