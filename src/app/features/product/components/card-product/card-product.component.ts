import { Component, AfterViewInit, ElementRef, NgZone, input, viewChild, inject, Input, output, EventEmitter, Output } from '@angular/core';
import { Product } from '../../modules/products';
import { RouterLink } from '@angular/router';
import { ToasterService } from '../../services/toaster-service.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent implements AfterViewInit {
  @Input() product!: Product;
  readonly cardContainer = viewChild<ElementRef>('cardContainer');

  @Output() addToCart = new EventEmitter<string>();

  constructor(private ngZone: NgZone,private toasterService: ToasterService) {}


  OnaddToCart() {
    this.addToCart.emit(this.product.id);
    // Show toaster notification with checkout button
    this.toasterService.showAddedToCart(this.product.title);
  }



  ngAfterViewInit(): void {
    // Set up parallax effect after the view is initialized
    this.setupParallaxEffect();
  }

  setupParallaxEffect(): void {
    // Only run in browser environment
    if (typeof document === 'undefined') return;

    setTimeout(() => {
      const cards = document.querySelectorAll('.card-container');

      cards.forEach(card => {
        const productCard = card.querySelector('.product-card');
        const parallaxImg = card.querySelector('.parallax-img');

        if (!productCard || !parallaxImg) return;

        this.ngZone.runOutsideAngular(() => {
          card.addEventListener('mousemove', (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = card.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;

            // Calculate percentages
            const xPercent = (x / rect.width) - 0.5;
            const yPercent = (y / rect.height) - 0.5;

            // Subtle rotation effect
            (productCard as HTMLElement).style.transform = `
              rotateY(${xPercent * 4}deg)
              rotateX(${yPercent * -4}deg)
              scale3d(1.02, 1.02, 1.02)
            `;

            // Parallax image movement
            (parallaxImg as HTMLElement).style.transform = `
              translateX(${xPercent * -10}px)
              translateY(${yPercent * -10}px)
              scale(1.1)
            `;
          });
          card.addEventListener('mouseleave', (e: Event) => {
            // Reset transforms
            (productCard as HTMLElement).style.transform = 'rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
            (parallaxImg as HTMLElement).style.transform = 'translateX(0) translateY(0) scale(1)';
          });
        });
      });
    }, 500 as number); // Small delay to ensure DOM is ready
  }



}
