import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OrderItem {
  product_id: number;
  name: string;
  image_url?: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(
    items: { product_id: number; quantity: number }[],
  ): Observable<any> {
    return this.http.post(this.apiUrl, { items });
  }

  getOrders(): Observable<{ orders: Order[] }> {
    return this.http.get<{ orders: Order[] }>(this.apiUrl);
  }

  getOrder(id: number): Observable<{ order: Order }> {
    return this.http.get<{ order: Order }>(`${this.apiUrl}/${id}`);
  }
}
