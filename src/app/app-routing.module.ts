import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductsByCategoryComponent} from "./products-by-category/products-by-category.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {AccountComponent} from "./account/account.component";
import {OrdersComponent} from "./orders/orders.component";
import {BeforeloginService} from "./service/beforelogin.service";
import {AfterloginService} from "./service/afterlogin.service";
import {RequestResetComponent} from "./password/request-reset/request-reset.component";
import {ResponseResetComponent} from "./password/response-reset/response-reset.component";
import {SearchComponent} from "./search/search.component";
import {LoginGuard} from "./login.guard";
import {ViewOrdersComponent} from "./orders/view-orders/view-orders.component";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
  //  canActivate: [LoginGuard]
  },
  {path: 'product',component:ProductDetailsComponent},
  {path: 'cart',component:CartComponent},
  {path: 'checkout',component:CheckoutComponent},
  {path: 'signup',
    component:SignupComponent,

  },
  {path: 'login',
    component:LoginComponent,

  },
  {path: 'search',
    component:SearchComponent
  },
  {path: 'account/:name',
    component:AccountComponent,
    canActivate: [LoginGuard]
  },
  {path: 'account/:name/orders',
    component:OrdersComponent,
    canActivate: [LoginGuard]
  },
  {path: 'account/order/:id',
    component:ViewOrdersComponent,

  },
  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [BeforeloginService]
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeloginService]
  },
  {path: 'category/:slug', component: ProductsByCategoryComponent},
  {path: 'product/:id', component:ProductDetailsComponent},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
