import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as WC from 'woocommerce-api';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  WooCommerce: any;
  products:any[];
  isLoaded:boolean=true;
  constructor(
    public Router: Router,
    public activatedRoute:ActivatedRoute
  ) {
    this.WooCommerce = WC({
      url: 'https://jambosacco.com/shop/',
      consumerKey: 'ck_a73501c5a571a13208456c01e55950ae6b998747',
      consumerSecret: 'cs_87564bea399403a2c82b276e079940df365330d7',
      queryStringAuth: true,
    });
    this.activatedRoute.queryParams.subscribe(params => {
      let search = params['query'];
     this.WooCommerce.getAsync("products?filter[q]="+search).then((searchData)=>{
      this.products=JSON.parse(searchData.body).products;
      console.log(this.products)
       this.isLoaded=false;
     })
    });
  }

  ngOnInit() {
  }

}
