import { AuthService } from './../services/auth.service';
import { TokensService } from './../services/tokens.service';
import { JarwisService } from './../services/jarwis.service';
import {Component, Inject, Injectable, InjectionToken, OnInit} from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/internal/operators";
import {UserService} from "../user.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {LoginResultModel} from "../models/LoginResultModel";
import {LoginService} from "../login.service";

declare var $;

const STORAGE_KEY = 'loggedinUser';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;

  public error = null;
  public form={
    email:null,
    password:null
  }
  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
   public userService:UserService,

   public route: Router,
   private js: JarwisService,
   private router: Router,
    private ht:HttpClient,
   public loginService:LoginService,
   public Auth: AuthService,
   private Token: TokensService,
   public activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
  }
  signin(){
this.loginService.login(this.form.email,this.form.password)
  .subscribe(
    r => {
      console.log(r.status);
      if (r.status=='ok') {
       // this.userService.setToken('Token',r.user);
        this.userService.setUser(r.user);
        this.router.navigateByUrl('');
      }
    },
    r => {
      alert(r.error.error);
    });
  }

  // signIn(){
  //this.userService.setUser(resp.user)
  //this.route.navigateByUrl('')
  //   this.js.login(this.form).subscribe(
  //     data=> this.handleResponse(data),
  //     error=>this.handleError(error)
  //   )
  // }
  handleError(error) {
    this.error = error.error.error;
  }
  handleResponse(data) {

    this.userService.setUser(data.user);
    this.Token.handle(data.access_token);
     this.Auth.changeAuthStatus(true);
   this.router.navigateByUrl('/');
  }
}
