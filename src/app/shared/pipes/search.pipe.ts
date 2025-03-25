import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../features/product/modules/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchText: string): Product[] {

    return products.filter((item) => {
      item.title.toLowerCase().includes(searchText.toLowerCase());
    }); ;
  }

}
