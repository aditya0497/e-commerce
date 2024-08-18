import { Component, OnInit } from '@angular/core';
import { Product, CartItem } from '../models/models';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public _products: Product[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 150 },
    { id: 3, name: 'Product 3', price: 200 }
  ];

  public _cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  public ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this._cartItems = items;
    });
  }

  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  public incrementQuantity(productId: number): void {
    this.cartService.incrementQuantity(productId);
  }

  public decrementQuantity(productId: number): void {
    this.cartService.decrementQuantity(productId);
  }

  public getQuantity(productId: number): number {
    const item = this._cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }
}
