import {ChangeDetectorRef, Component, Inject, NgZone, OnInit, Pipe} from '@angular/core';
import * as WC from 'woocommerce-api';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {WoocommerceService} from "../services/woocommerce.service";
import {UserService} from "../user.service";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
@Pipe({name: 'orders'})
export class OrdersComponent implements OnInit {
  WooCommerce: any;
  orders:any=[];
  isLoaded:boolean=true;
  constructor( public userService:UserService,
               public ref : ChangeDetectorRef,
               private ngzone:NgZone,
               private http: HttpClient,
               public wc: WoocommerceService) {

    // this.WooCommerce = WC({
    //   url: 'https://jambosacco.com/shop/',
    //   consumerKey: 'ck_eb184671749c45a17916efce873f6efc2c63f315',
    //   consumerSecret: 'cs_957b0cc5370272d9e2256ed3040ddd0fd9775b75',
    //   queryStringAuth: true,
    // });
    this.WooCommerce = WC({
      url: 'https://jambosacco.com/shop/',
      consumerKey: 'ck_a73501c5a571a13208456c01e55950ae6b998747',
      consumerSecret: 'cs_87564bea399403a2c82b276e079940df365330d7',
      queryStringAuth: true,
    });
  }

  ngOnInit() {

    $('.checkout_progress').show();
    // this.WooCommerce.get('payment_gateways/paypal', function(err, data, res) {
    // //  console.log(res);
    // });
    let response=  this.userService.getUser();
    this.WooCommerce.getAsync('orders?filter[customer_id]='+response.id).then((data)=>{

     this.orders=JSON.parse(data.body).orders;
    console.log(this.orders)
      $('.checkout_progress').css('display','none');
      this.ref.detectChanges();
    })

  }

}
