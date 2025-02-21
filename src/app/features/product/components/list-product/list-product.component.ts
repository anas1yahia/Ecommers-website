import { ProductsService } from './../../services/products.service';
import { Component, inject, Input } from '@angular/core';
import { CardProductComponent } from "../card-product/card-product.component";
import { Product } from '../../modules/products';

@Component({
  selector: 'app-list-product',
  imports: [CardProductComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {

  allProducts: Product[] = [];
  private readonly ProductsService = inject(ProductsService);

  getAllProducts() {
    this.ProductsService.getProducts().subscribe({
      next: ({data}) => {
        this.allProducts = data;
      }
    })
  }
  ngOnInit(): void {
    this.getAllProducts();
  }


}


