import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardService } from '../product/services/card.service';
import { CartItemComponent } from './cart-item/cart-item.component';

interface Cart {
  data: {
    products: any[];
    totalCartPrice: number;
  };
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // Initialize with safe defaults
  CartDetails: Cart = {
    data: {
      products: [],
      totalCartPrice: 0
    }
  };
  isLoading: boolean = true;

  constructor(
    private cardService: CardService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Only load cart in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.loadCart();
    } else {
      // In SSR, just set loading to false
      this.isLoading = false;
    }
  }

  loadCart(): void {
    this.isLoading = true;
    this.cardService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.CartDetails = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.isLoading = false;
        // Set safe defaults on error
        this.CartDetails = {
          data: {
            products: [],
            totalCartPrice: 0
          }
        };
      }
    });
  }

  removeItem(id: string): void {
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

  //updownQuantity
  updownQuantity(id: string, count: number): void {

    this.cardService.UpdateCart(id, count).subscribe({
      next: (res) => {
        this.CartDetails = res;

      },

    });
  }

  clearCart(): void {
    this.cardService.ClearCart().subscribe({
      next: (res) => {
        this.CartDetails = res;
        if (res.message == 'success') {
          this.loadCart();

        }
      }
    });
  }
}
