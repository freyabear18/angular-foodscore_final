import { Directive } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[fsOneChecked]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: OneCheckedDirective, multi: true },
  ],
})
export class OneCheckedDirective implements Validator {
  validate(group: FormGroup): ValidationErrors | null {
    if (Object.values(group.value).every((v) => v === false)) {
      // No checked
      return { oneChecked: true };
    }
    return null; // No errors
  }
}
