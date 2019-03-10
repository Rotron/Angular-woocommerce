import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  };

  constructor() { }

  handle(token) {
    this.set(token);
  }
setUserdata(user){
    localStorage.setItem('userinfo',JSON.stringify(user))
}
retrieveUserdata(){
  return JSON.parse(localStorage.getItem('userinfo'))
}
  set(userObject) {
    localStorage.setItem('token', JSON.stringify(userObject));
  }
  get() {
    return JSON.parse(localStorage.getItem('token'))
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
  }
  logout() {

  }
  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
