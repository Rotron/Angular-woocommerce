import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TokensService} from "./tokens.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public token: TokensService
  ) { }

  public userData=new BehaviorSubject<string>(this.token.retrieveUserdata())
  authUserdata = this.token.retrieveUserdata();

}
