import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  qty = 1;
  addedMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private cart: CartService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productSvc.getProduct(id).subscribe({
      next: (res) => {
        this.product = res.product;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  increaseQty(): void {
    this.qty++;
  }
  decreaseQty(): void {
    if (this.qty > 1) this.qty--;
  }

  addToCart(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.product) {
      this.cart.addToCart(this.product, this.qty);
      this.addedMessage = `Added ${this.qty} × ${this.product.name} to your cart!`;
      setTimeout(() => (this.addedMessage = ''), 3000);
      this.qty = 1;
    }
  }
}
