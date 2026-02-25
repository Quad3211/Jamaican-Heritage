import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName = '';
  cartCount = 0;

  constructor(
    private auth: AuthService,
    private cart: CartService,
  ) {}

  ngOnInit(): void {
    this.userName = this.auth.currentUser?.name || 'Guest';
    this.cart.items$.subscribe(
      (items) => (this.cartCount = items.reduce((s, i) => s + i.quantity, 0)),
    );
  }
}
