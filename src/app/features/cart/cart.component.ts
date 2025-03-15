import { Cart } from './modules/cart.interfaxw';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CardService } from '../product/services/card.service';

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


  ngOnInit(): void {
    this.loadCart()
  }


  private readonly cartService = inject(CardService);

loadCart(){
  this.cartService.getLoggedUserCart().subscribe({
    next: (res) => {
     this.CartDetails = res;

    },

  });
}


}
