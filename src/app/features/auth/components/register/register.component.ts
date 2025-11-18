import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { Auth } from 'auth-lib';
import { InputErrorComponent } from "../../../../shared/components/inputErorr/inputerorr";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, CommonModule, InputErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  errorMessage = signal('');
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  isLoading = signal(false);
  isDropdownOpen = signal(false);
  phoneNumber = signal('');
    _auth=inject(Auth);
    _router=inject(Router)

  countries = signal([
    { name: 'Egypt', code: '+20', flag: 'https://flagcdn.com/eg.svg' },
    { name: 'United States', code: '+1', flag: 'https://flagcdn.com/us.svg' },
    { name: 'United Kingdom', code: '+44', flag: 'https://flagcdn.com/gb.svg' },
    { name: 'Australia', code: '+61', flag: 'https://flagcdn.com/au.svg' },
    { name: 'Germany', code: '+49', flag: 'https://flagcdn.com/de.svg' },
    { name: 'France', code: '+33', flag: 'https://flagcdn.com/fr.svg' },
  ]);

  selectedCountry = signal(this.countries()[0]);

  registerForm: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ )]],
      rePassword: ['', Validators.required],
    },
    {
      validators: (form: FormGroup) =>
        form.get('password')?.value === form.get('rePassword')?.value ? null : { mismatch: true },
    }
  );

  ngOnInit(): void {
    initFlowbite();
  }

  toggleDropdown() {
    this.isDropdownOpen.update((v) => !v);
  }

  selectCountry(country: { name: string; code: string; flag: string }) {
    this.selectedCountry.set(country);
    this.isDropdownOpen.set(false);
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

  submitRegister() {
      if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if(this.registerForm.valid){
     this.isLoading.set(true);
     this._auth.register(this.registerForm.value).subscribe({
      next:(res)=>{
        this.isLoading.set(false);
        if(res.message==='success'){
           this.errorMessage.set('');
          setTimeout(() => {
            this._router.navigate(['/auth/login'])
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
  this.registerForm.reset();
}
}
