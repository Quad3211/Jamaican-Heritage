import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../core/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(private orderSvc: OrderService) {}

  ngOnInit(): void {
    this.orderSvc.getOrders().subscribe({
      next: (res) => {
        this.orders = res.orders.map((o) => ({
          ...o,
          items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
        }));
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  getStatusClass(status: string): Record<string, boolean> {
    return {
      'badge-green': status === 'delivered',
      'badge-gold': status === 'pending' || status === 'processing',
      'badge-red': status === 'cancelled',
    };
  }
}
