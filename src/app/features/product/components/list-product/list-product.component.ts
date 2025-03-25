import { SearchPipe } from './../../../../shared/pipes/search.pipe';
import { ProductsService } from './../../services/products.service';
import { Component, inject, Input } from '@angular/core';
import { CardProductComponent } from "../card-product/card-product.component";
import { Product } from '../../modules/products';
import { CardService } from '../../services/card.service';
import { ToasterService } from '../../../product/services/toaster-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list-product',
  imports: [CardProductComponent,SearchPipe],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {


  @Input() searchTerm: string = '';

  allProducts: Product[] = [];
  private readonly ProductsService = inject(ProductsService);
  private readonly cardService = inject(CardService);


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
       this.cardService.counter.next(res.numOfCartItems);
     }
    }
    );
   }
  ngOnInit(): void {
    this.getAllProducts();
  }


}


