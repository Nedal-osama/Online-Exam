import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (control && control.touched && control.invalid) {
      <p class="text-red-600 text-sm mt-1">
        {{ getErrorMessage() }}
      </p>
    }
  `,
})
export class InputErrorComponent {
  @Input() control!: AbstractControl | null;

  getErrorMessage() {
    if (!this.control) return '';

    if (this.control.hasError('required')) return 'This field is required';
    if (this.control.hasError('email')) return 'Invalid email format';

    if (this.control.hasError('minlength')) {
      const required = this.control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${required}`;
    }

    if (this.control.hasError('maxlength')) {
      const required = this.control.errors?.['maxlength'].requiredLength;
      return `Maximum length is ${required}`;
    }

    if (this.control.hasError('pattern')) return 'Invalid format';

    return '';
  }
}
