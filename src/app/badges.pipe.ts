import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badges'
})
export class BadgesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
