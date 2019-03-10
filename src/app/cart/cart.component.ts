import {Component, OnInit, Inject, Injectable, ChangeDetectorRef} from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import {ActivatedRoute, Router} from "@angular/router";
const STORAGE_KEY = 'local_cart';
declare var $;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItems:any[];
  total:any;
isEmpty:boolean=false;
  constructor( @Inject(SESSION_STORAGE) private storage: StorageService,public ref : ChangeDetectorRef, public route: Router,public activatedRoute:ActivatedRoute ) {
    this.total=0.0

  }

  ngOnInit() {
    this.cartItems = this.storage.get(STORAGE_KEY);
    if(this.cartItems.length>0){
      this.cartItems.forEach((item,index)=>{
        this.total=this.total+(item.product.price*item.qty)
      })
    }else{
      this.isEmpty=true;
    }
    this.ref.detectChanges();
  }
  remove(cartitem,i){
    // let price=cartitem.product.price;
    // let qty=cartitem.qty;
    this.cartItems.splice(i,1);
    this.storage.set(STORAGE_KEY,this.cartItems);
   // this.total=this.total-(price*qty);
    if(this.cartItems.length==0){
      this.isEmpty=true;
    }
  }
  changeQTY(item,i,change){

    if(change<0 && item.qty==1){
      return;
    }

    let price= parseFloat( item.product.price)
    let  qty=item.qty
    qty=qty+change;
    item.qty=qty;
    item.amount=qty*price;


    this.cartItems[i]=item;
    this.storage.set(STORAGE_KEY,this.cartItems);
}

}
