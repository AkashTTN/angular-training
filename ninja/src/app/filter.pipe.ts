import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchFilter: string): any {
    if (value.length === 0 || searchFilter === '') {
      return value;
    }

    return value.filter((item) => item.name.toLowerCase().includes(searchFilter.toLowerCase()));
  }

}
