import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';
import {map} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {
  WooCommerce: any;
  products:[];
  drinks:any[];
  categories:any[];

  constructor(private http: HttpClient) {
    this.WooCommerce = WC({
      url: 'https://sk-cheruyot.co.ke/shop/',
      consumerKey: 'ck_6969eae068ad2a3d08808c28df9680d8dd4a6a1b',
      consumerSecret: 'cs_d48b40fbb1bf82afb7ea6d908fe9c555d87bcc16',
      queryStringAuth: true,
      wpAPI: true, // Enable the WP REST API integration
      version: 'wc/v3' // WooCommerce WP REST API version
    });
  }
  getProducts() {
    return this.http.get('https://www.sk-cheruyot.co.ke/api/products.php').pipe(map(data => {
      return data;
    }));
  }
  getProduct(id) {
    return this.http.get('https://www.sk-cheruyot.co.ke/api/getproduct.php?id='+id).pipe(map(data => {
      return data;
    }));
  }
  getPaymentgateway(){
    this.http.get("https://www.garikenya.co.ke/wp/wp-json/wc/v3/payment_gateways").pipe(map(data=>{
      return data;
    }))
  }

  }

