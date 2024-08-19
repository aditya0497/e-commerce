import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItem, DiscountCode, Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<CartItem[]>([]);

  private discountCode: DiscountCode | null = null;

  constructor(private http: HttpClient) {}

  public getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  public addToCart(product: Product): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    this.cartItems.next(currentItems);
  }

  public incrementQuantity(productId: number): void {
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity += 1;
      this.cartItems.next(currentItems);
    }
  }

  public decrementQuantity(productId: number): void {
    const currentItems = this.cartItems.getValue();
    const itemIndex = currentItems.findIndex(item => item.product.id === productId);

    if (itemIndex !== -1) {
      if (currentItems[itemIndex].quantity > 1) {
        currentItems[itemIndex].quantity -= 1;
      } else {
        // Remove the item if quantity is 1 and user tries to decrement
        currentItems.splice(itemIndex, 1);
      }
      this.cartItems.next(currentItems);
    }
  }

  public removeFromCart(productId: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    console.log(currentItems, updatedItems);
    this.cartItems.next(updatedItems);
  }

  public applyDiscount(code: string): Observable<DiscountCode | null> {
    return this.http.post<DiscountCode | null>('/api/apply-discount', { code });
  }

  public setDiscountCode(code: DiscountCode): void {
    this.discountCode = code;
  }

  public getDiscount(): DiscountCode | null {
    return this.discountCode;
  }

  public clearCart(): void {
    this.cartItems.next([]);
    this.discountCode = null;
  }
}
