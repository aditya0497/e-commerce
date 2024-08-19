import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from "../models/models";
import { CartService } from "../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public _cartItems: CartItem[] = [];

  constructor(private cartService: CartService,
    private router: Router) {}

  public ngOnInit(): void {
    this.cartService.getCartItems()
      .subscribe(items => {
        this._cartItems = items;
      });
  }

  public checkout(): void {
    this.router.navigate(['/checkout']);  // Navigate to the checkout page
  }
}
