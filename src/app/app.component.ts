import {ChangeDetectorRef, Component, EventEmitter, Inject, Injectable, OnInit} from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import * as WC from 'woocommerce-api';
import {AuthService} from "./services/auth.service";
import {TokensService} from "./services/tokens.service";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {Subscription} from "rxjs/Rx";
const STORAGE_KEY = 'local_cart';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{
  isLoggedIn:boolean;
  public loggedIn: boolean;
  user:any;
  categories:any[];
  WooCommerce: any;
  searchQuery:string="";
  subscription: Subscription;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              public ref : ChangeDetectorRef,
              private Token: TokensService,
              public Router: Router,
              public userServices:UserService,
              private Auth: AuthService){
    this.categories=[];
    this.WooCommerce = WC({
      url: 'https://jambosacco.com/shop/',
      consumerKey: 'ck_a73501c5a571a13208456c01e55950ae6b998747',
      consumerSecret: 'cs_87564bea399403a2c82b276e079940df365330d7',
      queryStringAuth: true,
    });
    this.subscription = this.userServices.userInfo$.subscribe(
      info => {
        this.user=info;
       if(this.user!=null){
         this.isLoggedIn=true;
       }

      });
    this.userServices.userData$.subscribe(
      userInfo=>{
        console.log(userInfo)
      }
    )
  }
ngOnInit(){

 this.userServices.getUser();
  if(this.userServices.isLogged()){
    console.log("is logged in")
    this.isLoggedIn=true;
  }else{
    console.log("not logged in")
    this.isLoggedIn=false
  }
  this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  this.WooCommerce.getAsync("products/categories").then((data)=>{
    let temp:any[]=JSON.parse(data.body).product_categories;

    for(let i=0;i<temp.length;i++){
      if(temp[i].parent==0){
        this.categories.push(temp[i])

        this.ref.detectChanges();
      }
    }

  }, (err)=>{
    console.log(err)
  })
}
  logout(event: MouseEvent){
    this.storage.remove("loggedinUser")
    this.storage.remove("TOKEN")
    event.preventDefault();
    this.Token.remove();
    this.isLoggedIn=false;
    this.Auth.changeAuthStatus(false);
    this.Router.navigateByUrl('/login');
  }
openSide(){
  $('.sidenav').sidenav();
}
openNav(){
  $('.side-nav-large').toggle(
    function() {
      $('#main').animate({left: 0})
    }, function() {
      $('#main').animate({left:200})
    })
}

  closeSide(){
    $('.sidenav').sidenav({
      closeOnClick: true
    });
  }
  onSearch(event){

if(this.searchQuery.length>3){
  this.Router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  // this.Router.navigateByUrl('/search',{"searchQuery": this.searchQuery})
}
  }

}
