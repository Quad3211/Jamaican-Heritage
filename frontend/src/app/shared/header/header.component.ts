import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isLoggedIn = false;
  cartCount = 0;

  constructor(
    private auth: AuthService,
    private cart: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe((u) => (this.isLoggedIn = !!u));
    this.cart.items$.subscribe(
      (items) => (this.cartCount = items.reduce((s, i) => s + i.quantity, 0)),
    );
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.auth.logout();
    this.closeMenu();
    this.router.navigate(['/']);
  }
}
