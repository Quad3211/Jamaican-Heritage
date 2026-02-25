import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../core/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  searchTerm = '';
  loading = true;

  constructor(private productSvc: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productSvc.getCategories().subscribe({
      next: (res) => (this.categories = res.categories),
    });
  }

  filterByCategory(cat: string): void {
    this.selectedCategory = cat;
    this.loadProducts();
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading = true;
    this.productSvc
      .getProducts({
        category: this.selectedCategory || undefined,
        search: this.searchTerm || undefined,
      })
      .subscribe({
        next: (res) => {
          this.products = res.products;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
