import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {MockBackendInterceptor} from "./mocks/mock-backend.service";
import {ProductListComponent} from "./product-list/product-list.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    CheckoutComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
