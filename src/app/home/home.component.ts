import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as WC from 'woocommerce-api';
import {ActivatedRoute, Router} from "@angular/router";
import {WoocommerceService} from "../services/woocommerce.service";
import {ProductService} from "../services/product.service";
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  WooCommerce: any;
  products:any[];
  isLoaded:boolean=true;
  infiniteScrollDisabled:boolean=false;
  moreProducts:any[];
  getmoreProducts:any[];
  page:number;
  categories:any[];
  constructor( public ref : ChangeDetectorRef, public productService:ProductService, public route: Router,public activatedRoute:ActivatedRoute,public wc: WoocommerceService) {
    this.categories=[];
    this.moreProducts=[];
    this.page=1;
   const para=activatedRoute.snapshot.queryParams;
    this.WooCommerce = WC({
      url: 'https://jambosacco.com/shop/',
      consumerKey: 'ck_a73501c5a571a13208456c01e55950ae6b998747',
      consumerSecret: 'cs_87564bea399403a2c82b276e079940df365330d7',
      queryStringAuth: true,
    });
    // this.WooCommerce = WC({
    //   url: 'https://sk-cheruyot.co.ke/shop/',
    //   consumerKey: 'ck_dfae948e484a89c331abcd4910fa43f92ed15f89',
    //   consumerSecret: 'cs_8638e58270b4c11f9be6c1c688481679bd1654d0',
    //   queryStringAuth: true,
    // });

  }

  ngOnInit() {
    $('.slider').slider();

    this.WooCommerce.getAsync('products').then((resp)=>{

      this.products=JSON.parse(resp.body).products;
      this.isLoaded=false;

      this.ref.detectChanges();


    })

  }
  openProduct(product){
    this.productService.saveUrlData(product)

  }
  onScroll() {



      this.page ++;
      this.isLoaded=true;
      this.WooCommerce.getAsync("products?page="+this.page).then((data)=>{

        this.getmoreProducts=JSON.parse(data.body).products;
        this.moreProducts=this.moreProducts.concat(JSON.parse(data.body).products);

        if(this.moreProducts.length<10){

          // $.toast({
          //   text:'That is all folks,no more products to load',
          //   showHideTransition:'slide'
          // })

        }
        this.isLoaded=false;
        this.ref.detectChanges();



      }, (err)=>{
        console.log(err)
      })
    }

    // this.WooCommerce.getAsync('products').then((resp)=>{
    //
    //   this.products=JSON.parse(resp.body).products;
    //   this.isLoaded=false;
    //   this.ref.detectChanges();
    //
    //
    // })


}
