import { ProductsService } from './../../services/products.service';
import { Component, inject, Input } from '@angular/core';
import { CardProductComponent } from "../card-product/card-product.component";
import { Product } from '../../modules/products';
import { CardService } from '../../services/card.service';
import { ToasterService } from '../../../product/services/toaster-service.service';


@Component({
  selector: 'app-list-product',
  imports: [CardProductComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {

  allProducts: Product[] = [];
  private readonly ProductsService = inject(ProductsService);
  private readonly cardService = inject(CardService);
  private readonly toasterService = inject(ToasterService);


  constructor() {}

  getAllProducts() {
    this.ProductsService.getProducts().subscribe({
      next: ({data}) => {
        this.allProducts = data;
      }
    })
  }

  // Add To cart

  addProductToCart(product: Product) {


    this.cardService.addToCart(product.id).subscribe({
      next: (res: any) => {
       console.log(res);
     }
    }
    );
   }
  ngOnInit(): void {
    this.getAllProducts();
  }


}


