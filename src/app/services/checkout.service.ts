import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { AdminService } from './admin.service';
import { DiscountCode, OrderSummary, CartItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private cartService: CartService,
    private http: HttpClient,
    private adminService: AdminService) {}

  public checkout(cartItems: CartItem[], discount: DiscountCode | null): Observable<OrderSummary> {
    return this.http.post<OrderSummary>('/api/checkout', { cartItems, discount });
  }

  public getAvailableDiscountCodes(): Observable<DiscountCode[]> {
    return this.http.get<DiscountCode[]>('/api/available-discount-codes');
  }
}
