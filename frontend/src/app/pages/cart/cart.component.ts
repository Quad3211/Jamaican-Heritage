import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  checkingOut = false;
  orderSuccess = false;
  orderError = '';

  constructor(
    private cart: CartService,
    private orderSvc: OrderService,
  ) {}

  ngOnInit(): void {
    this.cart.items$.subscribe((items) => (this.items = items));
  }

  get totalItems(): number {
    return this.cart.totalItems;
  }
  get totalPrice(): number {
    return this.cart.totalPrice;
  }

  updateQty(id: number, qty: number): void {
    if (qty < 1) this.cart.removeFromCart(id);
    else this.cart.updateQuantity(id, qty);
  }

  remove(id: number): void {
    this.cart.removeFromCart(id);
  }

  checkout(): void {
    this.checkingOut = true;
    this.orderError = '';
    const orderItems = this.items.map((i) => ({
      product_id: i.product.id,
      quantity: i.quantity,
    }));
    this.orderSvc.createOrder(orderItems).subscribe({
      next: () => {
        this.cart.clearCart();
        this.orderSuccess = true;
        this.checkingOut = false;
      },
      error: (err) => {
        this.orderError = err.error?.message || 'Failed to place order.';
        this.checkingOut = false;
      },
    });
  }
}
