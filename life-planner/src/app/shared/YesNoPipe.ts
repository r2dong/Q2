import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yesNoPipe' })
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): string {
    return value === true ? 'Yes' : 'No';
  }
}
