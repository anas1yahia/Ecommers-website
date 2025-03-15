import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CardService } from '../product/services/card.service';
import { Cart } from './modules/cart.interfaxw';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any;
  CartDetails: Cart = {} as Cart;
  isLoading: boolean = false;

  private readonly cardService = inject(CardService);

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.isLoading = true;
    this.cardService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.CartDetails = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.isLoading = false;
      }
    });
  }

  removeItem(id: string) {
    this.isLoading = true;
    this.cardService.RemoveCartItem(id).subscribe({
      next: (res) => {
        this.CartDetails = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error removing item:', err);
        this.isLoading = false;
      }
    });
  }

  clearCart() {
    this.isLoading = true;
    this.cardService.ClearCart().subscribe({
      next: (res) => {
        this.CartDetails = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
        this.isLoading = false;
      }
    });
  }
}
