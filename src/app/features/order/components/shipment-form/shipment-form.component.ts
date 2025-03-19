import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { OrderService } from '../../service/order.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  estimatedDelivery: string;
}

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ShipmentFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() shippingMethodChanged = new EventEmitter<ShippingOption>();

  shipmentForm!: FormGroup;
  submitted = false;
  isSubmitting = false;
  validationErrors: string[] = [];
  isLoading = true;
  cartId: string | null = '';

  // Shipping options with various tiers
  shippingOptions: ShippingOption[] = [
    {
      id: 'free',
      name: 'Free Shipping',
      price: 0,
      description: 'Free standard shipping on orders over $50',
      estimatedDelivery: 'Delivery in 7-10 business days'
    },
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 4.99,
      description: 'Economy shipping for regular-sized packages',
      estimatedDelivery: 'Delivery in 5-7 business days'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 9.99,
      description: 'Faster delivery for time-sensitive orders',
      estimatedDelivery: 'Delivery in 2-3 business days'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 19.99,
      description: 'Premium overnight delivery service',
      estimatedDelivery: 'Next business day delivery'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getCardId();


  }

  getCardId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (data) => {
        console.log(data);
        this.cartId = data.get('id');

      }

    })
  }

  // Initialize form with validators
  initializeForm(): void {
    this.shipmentForm = this.fb.group({

      details: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required]],

      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10,15}$')
      ]],

    });
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const control = this.shipmentForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
  }




  // Submit the form
  onSubmit() {
    this.submitted = true;
    if (this.shipmentForm.invalid) {
      return;
    }

    if (!this.cartId) {
      console.error("Error: cartId is null or undefined.");
      return;
    }

    this.isLoading = true;
    this.orderService.Checkout(this.cartId, this.shipmentForm.value).subscribe({
      next: (data) => {
        console.log("Checkout successful:", data);
        this.isLoading = false;
        open(data.session.url, '_self');
      },
      error: (err) => {
        console.error("Checkout failed:", err);
        this.isLoading = false;
      }
    });
  }

}
