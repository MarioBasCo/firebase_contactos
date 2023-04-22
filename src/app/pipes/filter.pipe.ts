import { Pipe, PipeTransform } from '@angular/core';
import { IContacto } from '../home/home.page';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchValue: string, column: string): IContacto[] {
   if(!value || !searchValue){
    return value;
   }

   return value.filter((el: any) => el[column].toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}