import { JarwisService } from './../services/jarwis.service';

import { Component, OnInit } from '@angular/core';
import * as WC from 'woocommerce-api';
import {TokensService} from "../services/tokens.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:any={};
  WooCommerce: any;
  billing_shipping_same: boolean;
  public form={
    first_name:null,
    last_name:null,
    email:null,
    username:null,
    password:null

  }
  public error = [];
  constructor(private js: JarwisService,
              private token: TokensService,
              private router:Router,
              private http:HttpClient) {
    this.user.billing_address={};
    this.user.shipping_address={};
    this.billing_shipping_same=false;
    this.WooCommerce = WC({
      url: 'https://jambosacco.com/shop/',
      consumerKey: 'ck_a73501c5a571a13208456c01e55950ae6b998747',
      consumerSecret: 'cs_87564bea399403a2c82b276e079940df365330d7',
      queryStringAuth: true,
    });
  }

  createAccount(){

          this.js.signup(this.form).subscribe(
          data=>this.handleResponse(data),
          error=>this.handleError(error)
        )
  }
  signup(){
    let customerData={
      customer:{}
    }
    customerData.customer = {
      "email":this.user.email,
      "first_name":this.user.first_name,
      "last_name":this.user.last_name,
      "username":this.user.username,
      "password":this.user.password,
      "billing_address":{
        "first_name":this.user.first_name,
        "last_name":this.user.last_name,
        "company":"",
        "address_1":this.user.billing_address.address_1,
        "address_2":this.user.billing_address.address_2,
        "city":"",
        "state":this.user.billing_address.county,
        "postcode":this.user.billing_address.postalCode,
        "country":this.user.billing_address.country,
        "email":this.user.email,
        "phone":this.user.billing_address.phone
      },
      "shipping_address":{
        "first_name":this.user.first_name,
        "last_name":this.user.last_name,
        "company":"",
        "address_1":this.user.shipping_address.address_1,
        "address_2":this.user.shipping_address.address_2,
        "city":"",
        "state":this.user.shipping_address.county,
        "postcode":this.user.shipping_address.postalCode,
        "country":this.user.shipping_address.country,
      }

    }
    console.log(customerData)
    if(this.billing_shipping_same){
      this.user.shipping_address=this.user.shipping_address
    }

    // this.http.post('https://www.garikenya.co.ke/api/createCustomers.php',customerData).subscribe((resp)=>{
    //   console.log(resp)
    // })
    this.WooCommerce.postAsync('customers',customerData).then((resp)=>{
      this.router.navigateByUrl('/login');
    })
  }
  handleResponse(data) {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }
  handleError(error) {
    this.error = error.error.errors;
  }

  setBillingToShipping(){

    this.billing_shipping_same=!this.billing_shipping_same
  }
  checkEmail(){
    let validEmail=false;
    let reg=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(reg.test(this.user.email)){
      // email is valid
      this.WooCommerce.getAsync('customers/email/'+this.user.email).then((data)=>{
        let res= (JSON.parse(data.body))

        if(res.errors){

          validEmail=true;
          console.log("Email is available for use")
        }else{
          validEmail=false;
      $.toast({
        text:"That email is already in our database",
        showHideTransition:'slide'
      })
        }

      })
    }else{
      validEmail=false;

    }
  }
  ngOnInit() {
  }
 //  signUp(){
 //
 // let customer = {
 //      "email":this.newUser.email,
 //      "first_name":this.newUser.first_name,
 //      "last_name":this.newUser.last_name,
 //      "username":this.newUser.username,
 //      "password":this.newUser.password,
 //      "billing_address":{
 //        "first_name":this.newUser.first_name,
 //        "last_name":this.newUser.last_name,
 //        "company":"",
 //        "address_1":this.newUser.billing_address.address_1,
 //        "address_2":this.newUser.billing_address.address_2,
 //        "city":this.newUser.billing_address.city,
 //        "state":this.newUser.billing_address.state,
 //        "postcode":this.newUser.billing_address.postcode,
 //        "country":this.newUser.billing_address.country,
 //        "email":this.newUser.email,
 //        "phone":this.newUser.billing_address.phone
 //      },
 //      "shipping_address":{
 //        "first_name":this.newUser.first_name,
 //        "last_name":this.newUser.last_name,
 //        "company":"",
 //        "address_1":this.newUser.shipping_address.address_1,
 //        "address_2":this.newUser.shipping_address.address_2,
 //        "city":"",
 //        "state":this.newUser.shipping_address.state,
 //        "postcode":this.newUser.shipping_address.postcode,
 //        "country":this.newUser.shipping_address.country,
 //      }
 //
 //    }
 //    console.log(customer)
 //    if(this.billing_shipping_same){
 //      this.newUser.shipping_address=this.newUser.shipping_address
 //    }
 //
 //    // this.http.post('https://www.garikenya.co.ke/api/createCustomers.php',customerData).subscribe((resp)=>{
 //    //   console.log(resp)
 //    // })
 //    this.WooCommerce.post('customers', customer, function(err, data, res) {
 //      console.log(res);
 //    });
 //  }
}
