import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {TokensService} from "../services/tokens.service";

@Injectable({
  providedIn: 'root'
})
export class AfterloginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.Token.loggedIn();
  }
  constructor(private Token: TokensService) { }

}
