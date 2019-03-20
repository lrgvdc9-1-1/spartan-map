import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtermine'
})
export class FilterminePipe implements PipeTransform {

  transform(items: any[], searchText: string): any {

    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toUpperCase();
    
      return items.filter(customer => {
        var response = false;
        for(var x in customer) {
            if(customer[x] && typeof(customer[x]) == "string"){
              
              response = customer[x].includes(searchText);
            }else if(customer[x]) {
              response = customer[x].toString().includes(searchText);
            }
            if(response) {
              break; // Exit Loop
            }
        }
        return response;
    });
  }

}
