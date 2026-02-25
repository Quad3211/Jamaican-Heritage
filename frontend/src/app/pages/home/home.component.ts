import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featured: Product[] = [];
  loading = true;

  constructor(private productSvc: ProductService) {}

  ngOnInit(): void {
    this.productSvc.getProducts({ limit: 6 }).subscribe({
      next: (res) => {
        this.featured = res.products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
