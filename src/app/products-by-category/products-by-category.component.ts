import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import * as WC from 'woocommerce-api';
import {ActivatedRoute, Router} from "@angular/router";
import {WoocommerceService} from "../services/woocommerce.service";
import {Observable} from "rxjs/index";
@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {
  WooCommerce: any;

  drinks:any[];
  categories:any[];
  isLoaded:boolean=true;
  constructor( public wooService: WoocommerceService, public ref : ChangeDetectorRef, private zone: NgZone, public route: Router,public activatedRoute:ActivatedRoute,public wc: WoocommerceService) {
    // this.WooCommerce = WC({
    //   url: 'https://www.sk-cheruyot.co.ke/shop',
    //   consumerKey: 'ck_e050f50c9f1a87e0e66d9b32f86a6e0687174ecc',
    //   consumerSecret: 'cs_746629fc40160a449a58feb099d6ae893255aa5f',
    //   queryStringAuth: true
    // });
    this.isLoaded=true;
    this.WooCommerce = WC({
      url: 'https://jambosacco.com/shop/',
      consumerKey: 'ck_a73501c5a571a13208456c01e55950ae6b998747',
      consumerSecret: 'cs_87564bea399403a2c82b276e079940df365330d7',
      queryStringAuth: true,
    });
    // this.WooCommerce = WC({
    //   url: 'https://jambosacco.com/shop/',
    //   consumerKey: 'ck_eb184671749c45a17916efce873f6efc2c63f315',
    //   consumerSecret: 'cs_957b0cc5370272d9e2256ed3040ddd0fd9775b75',
    //   queryStringAuth: true,
    // });
    }
products:any=[];
  ngOnInit() {

    this.activatedRoute.params.subscribe(routeParams => {
this.isLoaded=true;
console.log(this.isLoaded)
      this.WooCommerce.getAsync("products?filter[category]=" + routeParams.slug ).then((result) => {

        //this.products=result.toJSON().body;
        this.products= JSON.parse(result.body).products;
        this.isLoaded=false;
        this.ref.detectChanges();


        // return JSON.parse(result.toJSON().body);
      });
      // console.log(routeParams)
      //
      // this.WooCommerce.getAsync("products?filter[category]=" + routeParams.slug ).then((data) => {
      //   this.products= data.toJSON().body.products;
      //
      //
      // });

    })





  }
getProducts(){


}
}
