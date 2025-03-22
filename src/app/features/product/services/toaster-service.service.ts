import { Injectable, signal, effect } from '@angular/core';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  actionLabel?: string;
  actionUrl?: string;
  duration?: number;
  productImage?: string; // For product-related toasts
  paused?: boolean;
  timeLeft?: number;
  startTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  showError(message: any, title: string = 'Error'): string {
    return this.show({
      title,
      message: typeof message === 'string' ? message : 'An error occurred',
      type: 'error',
      duration: 5000 // Errors should stay visible slightly longer
    });
  }

  // Also add error() as an alias to match ngx-toastr API
  error(message: any, title: string = 'Error'): string {
    return this.showError(message, title);
  }
  toasts = signal<Toast[]>([]);
  private timeouts = new Map<string, any>();

  constructor() {
    // Limit maximum number of toasts
    effect(() => {
      const currentToasts = this.toasts();
      if (currentToasts.length > 5) {
        const toRemove = currentToasts[0].id;
        this.remove(toRemove);
      }
    });
  }

  show(toast: Omit<Toast, 'id'>): string {
    const id = Date.now().toString();
    const newToast = {
      ...toast,
      id,
      paused: false,
      timeLeft: toast.duration || 3000,
      startTime: Date.now()
    };

    this.toasts.update(toasts => [...toasts, newToast]);

    // Auto remove after duration if not paused
    if (toast.duration !== 0) {
      this.timeouts.set(id, setTimeout(() => {
        this.remove(id);
      }, toast.duration || 3000));
    }

    return id;
  }


  pauseToast(id: string): void {
    this.toasts.update(toasts =>
      toasts.map(t => {
        if (t.id === id) {
          const elapsed = Date.now() - (t.startTime || Date.now());
          const timeLeft = Math.max(0, (t.duration || 3000) - elapsed);

          // Clear the timeout
          if (this.timeouts.has(id)) {
            clearTimeout(this.timeouts.get(id));
            this.timeouts.delete(id);
          }

          return { ...t, paused: true, timeLeft };
        }
        return t;
      })
    );
  }

  resumeToast(id: string): void {
    this.toasts.update(toasts =>
      toasts.map(t => {
        if (t.id === id && t.paused) {
          // Create a new timeout with remaining time
          if (t.timeLeft && t.timeLeft > 0) {
            this.timeouts.set(id, setTimeout(() => {
              this.remove(id);
            }, t.timeLeft));
          }

          return {
            ...t,
            paused: false,
            startTime: Date.now(),
            duration: t.timeLeft
          };
        }
        return t;
      })
    );
  }

  remove(id: string): void {
    // Clear any existing timeout
    if (this.timeouts.has(id)) {
      clearTimeout(this.timeouts.get(id));
      this.timeouts.delete(id);
    }

    // Add a fade-out class and delay the actual removal
    this.toasts.update(toasts =>
      toasts.map(t => t.id === id ? { ...t, removing: true } : t)
    );

    // Actually remove after animation completes
    setTimeout(() => {
      this.toasts.update(toasts => toasts.filter(t => t.id !== id));
    }, 300);
  }

  showAddedToCart(productName: string, productImage?: string): string {
    return this.show({
      title: 'Added to Cart',
      message: `${productName} has been added to your cart.`,
      type: 'success',
      actionLabel: 'Checkout',
      actionUrl: '/cart',
      duration: 6000,
      productImage
    });
  }
}
