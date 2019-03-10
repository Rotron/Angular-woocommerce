import {ChangeDetectorRef, Component, Inject, Injectable, OnInit} from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import {UserService} from "../user.service";
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
@Injectable()
export class AccountComponent implements OnInit {
  isLoggedIn:boolean;
  user:any;
  WooCommerce: any;
  userdetails:any;
  constructor( public userService:UserService, public ref : ChangeDetectorRef, ) {
    this.userdetails=this.userService.getUser()

  //  this.ref.detectChanges()
  }

  ngOnInit() {


  }

}
