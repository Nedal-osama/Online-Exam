import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Auth } from 'auth-lib';

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
  _auth=inject(Auth);
  _router=inject(Router)
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
    if(this.loginForm.valid){
     this.isLoading.set(true);
     this._auth.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.isLoading.set(false);
        if(res.message==='success'){
           this.errorMessage.set('');
          setTimeout(() => {
            this._router.navigate(['/main/home'])
          },1000);
         this.isLoading.set(false);
        }
      },
      error:(err)=>{
        this.isLoading.set(false);
        console.log('Full error object:', err);
       this.errorMessage.set(err.error.message);
      }
     });
    }
  }
  getShortError(msg: string) {
  const maxLength = 30;
  return msg.length > maxLength ? msg.slice(0, maxLength) + '...Is Wrong' : msg;

}
closeError() {
  this.errorMessage = signal('');
  this.loginForm.reset();
}
}
