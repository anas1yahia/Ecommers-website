import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../features/product/modules/products';

@Pipe({
  name: 'search',
  pure: false // Add this line
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchText: string): Product[] {
    if (!products || !searchText) {
      return products;
    }

    searchText = searchText.toLowerCase();

    return products.filter(product =>
      product.title.toLowerCase().includes(searchText)
    );
  }
}
