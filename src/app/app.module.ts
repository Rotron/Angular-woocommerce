import { AuthService } from './services/auth.service';
import { JarwisService } from './services/jarwis.service';
import 'materialize-css';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {WoocommerceService} from "./services/woocommerce.service";
import {HttpClientModule} from "@angular/common/http";
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ProductService} from "./services/product.service";
import {SESSION_STORAGE, StorageServiceModule} from 'angular-webstorage-service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { OrdersComponent } from './orders/orders.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { RequestResetComponent } from './password/request-reset/request-reset.component';
import { ResponseResetComponent } from './password/response-reset/response-reset.component';
import { TokensService } from './services/tokens.service';
import { SearchComponent } from './search/search.component';
import {UserService} from "./user.service";
import {LoginService} from "./login.service";
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { CompleteOrderComponent } from './orders/complete-order/complete-order.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SideBarComponent,
    ProductsByCategoryComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    SignupComponent,
    LoginComponent,
    AccountComponent,
    OrdersComponent,
    RequestResetComponent,
    ResponseResetComponent,
    SearchComponent,
    ViewOrdersComponent,
    CompleteOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StorageServiceModule,
    InfiniteScrollModule,
    FormsModule,
    SnotifyModule
  ],
  providers: [
    WoocommerceService,
    ProductService,
    JarwisService,
    AuthService,
    TokensService,
    { provide: 'SnotifyToastConfig',
     useValue: ToastDefaults},
    SnotifyService,
    UserService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
