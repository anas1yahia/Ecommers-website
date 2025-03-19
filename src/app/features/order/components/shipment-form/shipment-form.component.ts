import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { OrderService } from '../../service/order.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Subscribe to form value changes for real-time validation
    this.shipmentForm.valueChanges.subscribe(() => {
      if (this.submitted) {
        this.validateForm();
      }
    });
  }

  // Initialize form with validators
  initializeForm(): void {
    this.shipmentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required]],
      postalCode: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10,15}$')
      ]],
      shippingMethod: ['', [Validators.required]],
      notes: ['']
    });
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const control = this.shipmentForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
  }

  // Get error messages for a specific field
  getFieldErrorMessage(fieldName: string): string {
    const control = this.shipmentForm.get(fieldName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${fieldName} is required`;
    if (control.errors['minlength']) return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors['pattern']) {
      if (fieldName === 'postalCode') return 'Please enter a valid postal code';
      if (fieldName === 'phone') return 'Please enter a valid phone number';
    }

    return 'Invalid input';
  }

  // Set shipping method when selected
  selectShippingMethod(methodId: string): void {
    this.shipmentForm.get('shippingMethod')?.setValue(methodId);
    this.shipmentForm.get('shippingMethod')?.markAsTouched();

    // Find selected option and emit
    const selectedOption = this.shippingOptions.find(option => option.id === methodId);
    if (selectedOption) {
      this.shippingMethodChanged.emit(selectedOption);
    }
  }

  // Validate the entire form and collect errors
  validateForm(): void {
    this.validationErrors = [];

    Object.keys(this.shipmentForm.controls).forEach(key => {
      const control = this.shipmentForm.get(key);
      if (control && control.invalid) {
        const errorMsg = this.getFieldErrorMessage(key);
        if (errorMsg && !this.validationErrors.includes(errorMsg)) {
          this.validationErrors.push(errorMsg);
        }
      }
    });
  }


}
