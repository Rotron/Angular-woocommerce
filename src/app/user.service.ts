import {Inject, Injectable, InjectionToken} from '@angular/core';
import {SESSION_STORAGE, StorageService} from "angular-webstorage-service";
import {Subject} from "rxjs/Rx";
const STORAGE_KEY = 'loggedinUser';
const TOKEN = 'TOKEN';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  stateChange: Subject<{}> = new Subject<object>();
  userDetails: Subject<{}> = new Subject<object>();
  userInfo$ = this.stateChange.asObservable();
  userData$ = this.userDetails.asObservable();
  constructor(  @Inject(SESSION_STORAGE) private storage: StorageService) { }
  setUser(user){
   return this.storage.set(STORAGE_KEY,user);
  }
  getUser(){
   return this.storage.get(STORAGE_KEY);
  }
  isLogged() {
    this.stateChange.next(this.storage.get(STORAGE_KEY));
    return this.storage.get('loggedinUser')!=null;
  }
  getUserdata(){

    return this.userDetails.next(this.storage.get(STORAGE_KEY))
  }
}
