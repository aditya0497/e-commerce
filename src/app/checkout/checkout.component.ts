// src/app/components/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { CartItem, OrderSummary } from '../models/models';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public _cartItems: CartItem[] = [];

  public _discountCode: string = '';

  public orderSummary: OrderSummary = {
    totalItems: 0,
    totalAmount: 0,
    totalDiscount: 0,
    discountCodes: []
  };

  constructor(private cartService: CartService,
    private checkoutService: CheckoutService) {}

  public ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this._cartItems = items;
      this.calculateTotals();
    });
  }

  public applyDiscount(): void {
    this.cartService.applyDiscount(this._discountCode).subscribe(discount => {
      if (discount) {
        this.cartService.setDiscountCode(discount);
        this.calculateTotals();
      } else {
        alert('Invalid discount code');
      }
    });
  }

  public calculateTotals(): void {
    const discount = this.cartService.getDiscount();
    const totalItems = this._cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = this._cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalDiscount = discount ? (totalAmount * discount.discountPercentage) / 100 : 0;

    this.orderSummary = {
      totalItems,
      totalAmount,
      totalDiscount,
      discountCodes: discount ? [discount] : []
    };
  }

  public finishOrder(): void {
    this.checkoutService.checkout(this._cartItems, this.cartService.getDiscount()).subscribe(orderSummary => {
      this.orderSummary = orderSummary;
      this.cartService.clearCart();
      alert('Order placed successfully!');
    });
  }
}
