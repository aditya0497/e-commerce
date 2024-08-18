import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSummary } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getOrderSummaries(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>('/api/admin/order-summaries');
  }

  generateDiscountCode(): Observable<string> {
    return this.http.get<string>('/api/admin/generate-discount-code');
  }

  recordOrder(orderSummary: OrderSummary): Observable<void> {
    return this.http.post<void>('/api/admin/record-order', orderSummary);
  }
}
