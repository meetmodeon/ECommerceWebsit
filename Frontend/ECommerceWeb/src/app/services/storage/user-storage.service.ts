import { Injectable } from '@angular/core';
const TOKEN ='ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  private isBrowser():boolean{
    return typeof window!== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  public saveToken(token: string):void{
   if(this.isBrowser()){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
   }
  }

  public saveUser(user:any):void{
    if(this.isBrowser()){
      window.localStorage.removeItem('USER');
    window.localStorage.setItem(USER,JSON.stringify(user));
    }
  }

  static getToken(): string|null {
   if(typeof window !== 'undefined' && window.localStorage){
    return localStorage.getItem(TOKEN);
   }
   return null;
  }

  static getUser(): any{
   if(typeof window !== 'undefined' && window.localStorage){
    const user=localStorage.getItem(USER);
    return user? JSON.parse(user):null;
   }
   return null;
  }

  static getUserId():string{
    const user=this.getUser();
    if(user==null){
      return '';
    }
    return user.userId;
  }
  static getUserRole():string{
    const user=this.getUser();
    if(user==null){
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role:string =this.getUserRole();
    return role=='ADMIN';
  }

  
  static isCustomerLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role:string =this.getUserRole();
    return role=='CUSTOMER';
  }

  static signOut():void{
   if(typeof window !== 'undefined' && window.localStorage){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
   }
  }
}
