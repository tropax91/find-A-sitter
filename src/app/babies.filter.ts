import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Baby } from './entities/baby';

@Pipe({name: 'filterBabies'})

@Injectable()
export class FilterBabies implements PipeTransform {
     transform(items: Baby[], input: string): any {
       //any gør at man kan returner alt. en retur type. hvis der står void kan man ikke returner noget
       // input tjekker det vi skriver

      if (input && items.length > 0) {

        let itemsFound = items.filter(
          item => item.firstname.toLocaleLowerCase().includes(input.toLowerCase())
        );
        
       if (itemsFound && itemsFound.length > 0 ){
         return itemsFound;
       }
       return []; // In case none is found return an empty array.
     }
   return items;//We could change this to return [] if we didn't want to show any users until someone searches
 }
}


