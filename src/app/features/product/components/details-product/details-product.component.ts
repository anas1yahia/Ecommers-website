import { Product } from './../../modules/products';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CardProductComponent } from "../card-product/card-product.component";
import { FotterComponent } from "../../../../shared/components/fotter/fotter.component";



@Component({
  selector: 'app-details-product',
  imports: [CardProductComponent, FotterComponent],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css'
})



export class DetailsProductComponent {



productId!: string | null;
ProductDetails: Product = {} as Product;

private readonly activatedRoute = inject(ActivatedRoute)
private readonly productsService = inject(ProductsService)
getId(){
  this.activatedRoute.paramMap.subscribe({
    next: (urlData) => {

       this.productId = urlData.get('id');
    }
  })
}

getDetail(id:string | null){
  this.productsService.getProductDetails(this.productId).subscribe({
    next: ({data}) => {
      this.ProductDetails = data;
    }
  })
}


ngOnInit(): void{
  this.getId();
  this.getDetail(this.productId)


}

}
