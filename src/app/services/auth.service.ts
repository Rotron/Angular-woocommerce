import { Injectable } from '@angular/core';

import { TokensService } from './tokens.service';
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  constructor(public Token: TokensService) { }
  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }


}
