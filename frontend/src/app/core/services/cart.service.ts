import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly CART_KEY = 'jam_cart';
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  items$ = this.itemsSubject.asObservable();

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  get totalItems(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  addToCart(product: Product, quantity = 1): void {
    const current = [...this.items];
    const idx = current.findIndex((i) => i.product.id === product.id);
    if (idx >= 0) {
      current[idx] = {
        ...current[idx],
        quantity: current[idx].quantity + quantity,
      };
    } else {
      current.push({ product, quantity });
    }
    this.save(current);
  }

  updateQuantity(productId: number, quantity: number): void {
    const current = this.items
      .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0);
    this.save(current);
  }

  removeFromCart(productId: number): void {
    this.save(this.items.filter((i) => i.product.id !== productId));
  }

  clearCart(): void {
    this.save([]);
  }

  private save(items: CartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  private loadCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
