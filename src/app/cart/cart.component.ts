import { Component, OnInit } from '@angular/core';
import {CartItem} from "../models/models";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public _cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  public ngOnInit(): void {
    this.cartService.getCartItems()
      .subscribe(items => {
        this._cartItems = items;
      });
  }

  public checkout(): void {
    alert('Proceed to checkout');
  }
}
