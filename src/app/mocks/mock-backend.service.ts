import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OrderSummary, DiscountCode } from '../models/models';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  private orderSummaries: OrderSummary[] = [];

  private discountCodes: DiscountCode[] = [{ code: 'DISCOUNT10', discountPercentage: 10 }];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/api/apply-discount')) {
      const { code } = req.body;
      const discount = this.discountCodes.find(d => d.code === code);
      return of(new HttpResponse({ status: 200, body: discount || null }));
    }

    if (req.url.endsWith('/api/checkout')) {
      const { cartItems, discount } = req.body;
      if (!Array.isArray(cartItems)) {
        return of(new HttpResponse({ status: 400, body: 'Invalid cartItems' }));
      }
      const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
      const totalAmount = cartItems.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
      const totalDiscount = discount ? (totalAmount * discount.discountPercentage) / 100 : 0;
      const orderSummary: OrderSummary = {
        totalItems,
        totalAmount,
        totalDiscount,
        discountCodes: discount ? [discount] : []
      };
      this.orderSummaries.push(orderSummary);

      return of(new HttpResponse({ status: 200, body: orderSummary }));
    }

    if (req.url.endsWith('/api/admin/order-summaries')) {
      return of(new HttpResponse({ status: 200, body: this.orderSummaries }));
    }

    if (req.url.endsWith('/api/admin/generate-discount-code')) {
      const newCode = `DISCOUNT${Math.floor(Math.random() * 100)}`;
      this.discountCodes.push({ code: newCode, discountPercentage: 10 });
      return of(new HttpResponse({ status: 200, body: newCode }));
    }

    if (req.url.endsWith('/api/admin/record-order')) {
      return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}
