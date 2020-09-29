import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchFilter: string): any {

    const parsedSearchFilter = searchFilter.trim().toLowerCase();

    if (value.length === 0 || parsedSearchFilter === '') {
      return value;
    }

    return value.filter((item) => item.name.toLowerCase().includes(parsedSearchFilter));
  }

}
