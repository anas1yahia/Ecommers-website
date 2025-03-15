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

  // Update quantity method
  updateQuantity(change: number): void {
    // Only proceed if the result would be > 0
    const newCount = this.product.count + change;
    if (newCount <= 0) {
      // If quantity would become 0 or negative, just remove the item
      this.removeProduct();
      return;
    }

    // Call the service to update quantity
    this.cardService.UpdateCart(this.product.product._id, newCount).subscribe({
      next: (res) => {
        // Update the product count in the UI
        this.product.count = newCount;
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
      }
    });
  }
}
