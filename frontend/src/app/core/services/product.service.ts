import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  stock: number;
}

export interface ProductsResponse {
  products: Product[];
  count: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(params?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Observable<ProductsResponse> {
    let httpParams = new HttpParams();
    if (params?.category)
      httpParams = httpParams.set('category', params.category);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.limit) httpParams = httpParams.set('limit', params.limit);
    if (params?.offset) httpParams = httpParams.set('offset', params.offset);
    return this.http.get<ProductsResponse>(this.apiUrl, { params: httpParams });
  }

  getProduct(id: number): Observable<{ product: Product }> {
    return this.http.get<{ product: Product }>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<{ categories: string[] }> {
    return this.http.get<{ categories: string[] }>(`${this.apiUrl}/categories`);
  }
}
