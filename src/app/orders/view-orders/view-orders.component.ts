import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as WC from 'woocommerce-api';
import * as MPESA from 'mpesa-node'
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  WooCommerce: any;
  safmpesa:any;
  order:any={};
  paymentdetails:any=[];
  constructor(
    public activatedRoute:ActivatedRoute,
    public ref : ChangeDetectorRef,
    public http:HttpClient,
    public router:Router
  ) {
    this.WooCommerce = WC({
      url: 'https://jambosacco.com/shop/',
      consumerKey: 'ck_a73501c5a571a13208456c01e55950ae6b998747',
      consumerSecret: 'cs_87564bea399403a2c82b276e079940df365330d7',
      queryStringAuth: true,
    });

    let id= this.activatedRoute.snapshot.params['id'];
    this.WooCommerce.getAsync('orders/'+id).then((resp)=>{
      this.order=JSON.parse(resp.body).order;
      this.paymentdetails=JSON.parse(resp.body).order.payment_details;

      console.log(this.order)
      this.ref.detectChanges();
    })
  }

  ngOnInit() {

  }
pay(method){
    console.log(this.order.total)
    if(method=='cod'){
    this.router.navigateByUrl('/complete-order')
    }else if(method=='mpesa'){
      this.http.post('https://sk-cheruyot.co.ke/mpesa/c2b.php',this.order).subscribe((data)=>{
        console.log(data);
      })
    }
}
}
