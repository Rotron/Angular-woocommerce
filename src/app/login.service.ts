import { Injectable } from '@angular/core';
import {LoginResultModel} from "./models/LoginResultModel";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private ht:HttpClient,
  ) { }
  login(email,password) :Observable<LoginResultModel>{
    return this.ht.get<LoginResultModel>("https://jambosacco.com/shop/api/auth/generate_auth_cookie/?insecure=cool&username="+email+"&password="+password)
  }
}
