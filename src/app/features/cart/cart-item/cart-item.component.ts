import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../../product/services/card.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input() product: any;
  @Output() remove = new EventEmitter<string>();

  constructor(private cardService: CardService) {}

  // Method to emit product ID for removal
  removeProduct(): void {
    this.remove.emit(this.product.product._id);
  }

 

}
