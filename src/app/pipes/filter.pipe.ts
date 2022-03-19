import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  
  transform(items: any[], searchText: string): any[] {
     
    if (!items)return [];
    if (!searchText) return items;
      
    searchText= searchText.toLowerCase();
    return items.filter(filtered =>{
      console.log(filtered)
      console.log (items)
      return filtered.company.toLowerCase().includes(searchText);

    })

    }
        
  }


