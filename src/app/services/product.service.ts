import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
product:any[];
  constructor( public route: Router, ) { }

  saveUrlData(product) {
    this.route.navigateByUrl('/product')
    this.product = product;
  }
  getUrlData() {
    return this.product;
  }
}
