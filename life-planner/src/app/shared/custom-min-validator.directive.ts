import {Directive, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl} from '@angular/forms';

@Directive({
  selector: '[appCustomMinValidator][formControlName],[appCustomMinValidator][formControl],[appCustomMinValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomMinValidatorDirective,
      multi: true
    }
  ]
})
export class CustomMinValidatorDirective implements Validator {
  @Input()
  appCustomMinValidator: number;

  validate(c: FormControl): { [key: string]: any } {
    console.log('CustomMinValidatorDirective: c.value:' + c.value + ' should be greater than ' + this.appCustomMinValidator);
    const v = c.value;
    return (v < this.appCustomMinValidator) ? {'appCustomMinValidator': true} : null;
  }

}
