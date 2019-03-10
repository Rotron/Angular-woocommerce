import {ChangeDetectorRef, Component, Inject, Injectable, OnInit} from '@angular/core';
import * as WC from 'woocommerce-api';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WoocommerceService} from "../services/woocommerce.service";
import {SnotifyService} from 'ng-snotify';
declare var $;
const STORAGE_KEY = 'local_cart';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
@Injectable()
export class ProductDetailsComponent implements OnInit {
  product_detail: any=[];
  public data:any[]=[];
  WooCommerce: any;
  isLoaded:boolean=true;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              public wooService: WoocommerceService,
              private snotifyService: SnotifyService,
              public route: Router,
              public activatedRoute:ActivatedRoute,
              public ref : ChangeDetectorRef,
              public productService: ProductService) {


    this.WooCommerce = WC({
      url: 'https://jambosacco.com/shop/',
      consumerKey: 'ck_a73501c5a571a13208456c01e55950ae6b998747',
      consumerSecret: 'cs_87564bea399403a2c82b276e079940df365330d7',
      queryStringAuth: true,
    });
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((product)=>{

      this.WooCommerce.getAsync('products/'+product.id).then((resp)=>{
        this.product_detail=JSON.parse(resp.body).product;
        console.log(this.product_detail)

        this.isLoaded=false;
        this.ref.detectChanges()
      })

    })
  }
  public addtoCart(product,productID) {
    // get array of cartItems from local storage
     let data = this.storage.get(STORAGE_KEY);

    if(data==null){
      data=[];

      data.push({
        "product":product,
        "qty":1,
        "amount":parseFloat(product.price)
      })

    }else {
      let added=0;
      for(let i=0;i<data.length;i++){

        if(productID==data[i].product.id){

          let qty=data[i].qty;
          data[i].qty=qty+1;

          data[i].amount=parseFloat(data[i].amount)+parseFloat(data[i].product.price);
          added=1;

        }
      }
      if(added==0){
        data.push({
          "product":product,
          "qty":1,
          "amount":parseFloat(product.price)
        });
      }
    }
 this.storage.set(STORAGE_KEY, data);

    this.snotifyService.success('Item added to cart','Success', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true
    });

    console.log(this.storage
      .get(STORAGE_KEY) || 'LocaL storage is empty');
  }
  remove()
  {
    this.storage.remove(STORAGE_KEY)
  }
}
