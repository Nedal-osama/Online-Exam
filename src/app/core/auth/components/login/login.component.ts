import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Auth } from 'auth-Lib';
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
  _auth=inject(Auth);
  submit() {
    if(this.loginForm.valid){
     this.isLoading.set(true);
     this._auth.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.isLoading.set(false);
        console.log('login response :', res);
      },
      error:(err)=>{
        this.isLoading.set(false);
        this.errorMessage.set(err?.error?.message || 'An error occurred during login.');
      }
     });
    }

    this.isLoading.set(false);

  }
}
