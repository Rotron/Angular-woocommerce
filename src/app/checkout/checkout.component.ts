import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import * as WC from 'woocommerce-api';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import {SnotifyService} from "ng-snotify";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UserService} from "../user.service";
declare const M;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  newOrder: any;
  user:any;
  WooCommerce: any;
  userdetails:any;
  paymentMethods:any[];
  paymentMethod:any;
  public loggedIn: boolean;
  billing_shipping_same: boolean;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              public ref : ChangeDetectorRef,
              private snotifyService: SnotifyService,
              private Auth: AuthService,
              private userService:UserService,
              public route: Router,) {

    this.billing_shipping_same=false;
    this.paymentMethods=[

      {method_id:"paypal",method_title:"PayPal"},
      {method_id:"mpesa",method_title:"Mpesa"},
      {method_id:"cod",method_title:"Cash On Delivery"}
    ]
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

    this.newOrder=this.userService.getUser();
    this.newOrder.billing_address={
      first_name:this.newOrder.first_name,
      last_name:this.newOrder.last_name,
      email:this.newOrder.email,
      address_1:null,
      address_2:null,
      country:null,
      state:null,
    };
    this.newOrder.shipping_address={
      first_name:this.newOrder.first_name,
      last_name:this.newOrder.last_name,
      email:this.newOrder.email,
      address_1:null,
      address_2:null,
      country:null,
      state:null,
    };
    this.ref.detectChanges()
   }
  setBillingToShipping(){
    this.billing_shipping_same=!this.billing_shipping_same
    if(this.billing_shipping_same){
      this.newOrder.billing=this.newOrder.shipping
    }
  }
  placeOrder(){
    this.user=this.userService.getUser();

    $('#checkoutBtn').prop("disabled",true);
    $('.checkout_progress').show();
    let orderItems: any[]=[];//initialize as a blank array
    let data:any={};
    let paymentData:any={};
    this.paymentMethods.forEach((element,index)=>{

      if(element.method_id==this.paymentMethod){

        paymentData=element
      }
    });



    if(paymentData.method_id=="mpesa"){
      let items= this.storage.get('local_cart');

      items.forEach((element,index) => {
        orderItems.push({
          product_id: element.product.id,
          quantity: element.qty
        });
        data.line_items = orderItems;

        data = {
          payment_details: {
            method_id: 'mpesa',
            method_title: 'Lipa na Mpesa',
            paid: false
          },
          customer: this.user,
          billing_address: this.newOrder.billing_address,
          shipping_address: this.newOrder.shipping_address,
          customer_id: '2',
          line_items: orderItems
        };
        let orderData: any = {};
        orderData.order = data;

        this.WooCommerce.postAsync('orders', orderData).then((data) => {
          let response = JSON.parse(data.body).order;
          console.log(response)
          this.storage.remove('local_cart');
          this.route.navigateByUrl('/account/' + this.newOrder.nicename)
          var toastHTML = '<span>Order placed successfully</span><button class="btn-flat toast-action"><i class="material-icons">\n' +
            'check_circle\n' +
            '</i></button>';
          M.toast({html: toastHTML});
          $('#checkoutBtn').prop("disabled", false);
          $('.checkout_progress').css('display', 'none');
        });
      })
    }else if(paymentData.method_id=="cod"){
      let items= this.storage.get('local_cart');

       items.forEach((element,index) => {
         orderItems.push({
           product_id: element.product.id,
           quantity: element.qty
         });
         data.line_items = orderItems;

         data = {
           payment_details: {
             method_id: 'cod',
             method_title: 'Cash On Delivery',
             paid: false
           },
           customer: this.user,
           billing_address: this.newOrder.billing_address,
           shipping_address: this.newOrder.shipping_address,
           customer_id: '2',
           line_items: orderItems
         };
         let orderData: any = {};
         orderData.order = data;

         this.WooCommerce.postAsync('orders', orderData).then((data) => {
           let response = JSON.parse(data.body).order;
           console.log(response)
           this.storage.remove('local_cart');
           this.route.navigateByUrl('/account/' + this.newOrder.first_name)
           var toastHTML = '<span>Order placed successfully</span><button class="btn-flat toast-action"><i class="material-icons">\n' +
             'check_circle\n' +
             '</i></button>';
           M.toast({html: toastHTML});
           $('#checkoutBtn').prop("disabled", false);
           $('.checkout_progress').css('display', 'none');
         });
       })
    } else{
      alert('other payment option')
     // let items= this.storage.get('local_cart');
     //
     //  items.forEach((element,index) => {
     //    orderItems.push({
     //      product_id:element.product.id,
     //      quantity:element.qty
     //    });
     //    data.line_items=orderItems;
     //
     //    data={
     //      payment_details:{
     //        method_id:'cod',
     //        method_title:'Cash On Delivery',
     //        paid:true
     //      },
     //      customer:this.user,
     //      billing_address:this.newOrder.billing_address,
     //      shipping_address:this.newOrder.shipping_address,
     //      customer_id:'2',
     //      line_items:orderItems
     //    };
     //  let orderData:any={};
     //  orderData.order=data;
     //
     //    this.WooCommerce.postAsync('orders',orderData).then((data)=>{
     //      let response=JSON.parse(data.body).order;
     //      console.log(response)
     //     this.storage.remove('local_cart');
     //     this.route.navigateByUrl('/account/'+this.newOrder.first_name)
     //      var toastHTML = '<span>Order placed successfully</span><button class="btn-flat toast-action"><i class="material-icons">\n' +
     //        'check_circle\n' +
     //        '</i></button>';
     //      M.toast({html: toastHTML});
     //      $('#checkoutBtn').prop("disabled",false);
     //      $('.checkout_progress').css('display','none');
     //    });
     //
     //
     //  })
    }


  }
}
