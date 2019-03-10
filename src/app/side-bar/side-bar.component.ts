import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as WC from 'woocommerce-api';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  WooCommerce: any;
  products: any[];
  categories:any[];
  constructor(public ref : ChangeDetectorRef, public route: Router,public activatedRoute:ActivatedRoute) {
    this.categories=[];
  }

  ngOnInit() {
    this.WooCommerce = WC({
      url: 'https://sk-cheruyot.co.ke/shop/',
      consumerKey: 'ck_dfae948e484a89c331abcd4910fa43f92ed15f89',
      consumerSecret: 'cs_8638e58270b4c11f9be6c1c688481679bd1654d0',
      queryStringAuth: true,
    });
    this.WooCommerce.getAsync("products/categories").then((data)=>{


      let temp:any[]=JSON.parse(data.body).product_categories;

      for(let i=0;i<temp.length;i++){
        if(temp[i].parent==0){
          this.categories.push(temp[i])
          //this.ref.detectChanges();
        }
      }

    }, (err)=>{
      console.log(err)
    })



  }

}
