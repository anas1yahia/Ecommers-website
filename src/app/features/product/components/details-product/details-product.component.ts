import { Product } from './../../modules/products';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FotterComponent } from "../../../../shared/components/fotter/fotter.component";
import { CardProductComponent } from "../card-product/card-product.component";



@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [FotterComponent],
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


// Mock related products data for more realistic UI
relatedProducts = [
  { id: 1, name: 'Wireless Earbuds with Active Noise Cancellation', price: 59.99, originalPrice: 89.99, rating: 4.7, reviews: 48, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300' },
  { id: 2, name: 'Smart Watch with Health Monitoring', price: 79.99, originalPrice: 119.99, rating: 4.5, reviews: 36, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: 3, name: 'Bluetooth Speaker Waterproof', price: 45.99, originalPrice: 69.99, rating: 4.8, reviews: 72, image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=300' },
  { id: 4, name: 'Noise Cancelling Headphones', price: 129.99, originalPrice: 199.99, rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300' },
  { id: 5, name: 'Portable Power Bank 20000mAh', price: 39.99, originalPrice: 59.99, rating: 4.6, reviews: 95, image: 'https://images.unsplash.com/photo-1585338075505-526386655796?w=300' },
  { id: 6, name: 'USB-C Fast Charging Cable Set', price: 19.99, originalPrice: 29.99, rating: 4.4, reviews: 112, image: 'https://images.unsplash.com/photo-1600490722773-35753aea6332?w=300' }
];

// Fallback images and product names
fallbackImages = [
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
  'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=300',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300',
  'https://images.unsplash.com/photo-1585338075505-526386655796?w=300',
  'https://images.unsplash.com/photo-1600490722773-35753aea6332?w=300'
];

// Safe access methods with fallbacks
getRelatedProductImage(product: any, index: number): string {
  if (product && typeof product === 'object' && product.image) {
    return product.image;
  }
  // Use ProductDetails image if available, otherwise use fallback image
  return this.ProductDetails?.imageCover || this.fallbackImages[index % this.fallbackImages.length];
}

getRelatedProductName(index: number): string {
  const productNames = [
    'Wireless Earbuds with Noise Cancellation',
    'Smart Watch with Heart Rate Monitor',
    'Bluetooth Speaker Waterproof',
    'Noise Cancelling Headphones',
    'Portable Power Bank 20000mAh',
    'USB-C Fast Charging Cable Set'
  ];
  return this.relatedProducts?.[index]?.name || productNames[index % productNames.length];
}

getRelatedProductPrice(index: number): number {
  // Use product price if available, otherwise use a calculated price
  return this.relatedProducts?.[index]?.price ||
         (this.ProductDetails?.price ? Math.round(this.ProductDetails.price * 0.8) : 49.99 + index * 10);
}

getRelatedProductOriginalPrice(index: number): number {
  // Use product original price if available, otherwise calculate it
  return this.relatedProducts?.[index]?.originalPrice ||
         parseFloat((this.getRelatedProductPrice(index) * 1.4).toFixed(2));
}


ngOnInit(): void{
  this.getId();
  this.getDetail(this.productId)


}



}
