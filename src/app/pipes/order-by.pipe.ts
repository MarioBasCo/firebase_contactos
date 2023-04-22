import { Pipe, PipeTransform } from "@angular/core";
import { IContacto } from "../home/home.page";

@Pipe({
    name: 'orderBy',
    standalone: true
})

export class OrderByPipe implements PipeTransform{
    
    transform(value: IContacto[], ...args: string[]): IContacto[] {
        if(!Array.isArray(value)){ 
            return value;
        };

        const [property, order = 'asc']: string[] = args;

        return value.sort((a, b) => {
            //@ts-ignore;
            const compare = a[property].localeCompare(b[property]);
            return order === 'asc' ? compare : -compare;
        })
    }
    
}