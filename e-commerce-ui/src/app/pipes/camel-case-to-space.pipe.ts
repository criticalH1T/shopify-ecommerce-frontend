import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToSpace',
})
export class CamelCaseToSpacePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
