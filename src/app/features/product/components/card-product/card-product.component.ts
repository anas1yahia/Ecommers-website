import { Component, Input, input } from '@angular/core';
import { Product } from '../../modules/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-product',
  imports: [RouterLink],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() product!: Product;

}
