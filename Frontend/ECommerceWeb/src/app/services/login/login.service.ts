import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:8080/"
  constructor(private http:HttpClient,
    private userService:UserStorageService
  ) { }

  doLogin(username:string,password:string):Observable<any> {
    const headers= new HttpHeaders().set('Content-Type','application/json');
    const body= {username,password}
    return this.http.post(`${this.url}authenticate`,body,{
      headers,
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map((response:any) =>{
       const token=response.token;
      //  const token= rowToken?.substring(7);
       const userId= response.userId;
       const role= response.role;
       if (token && userId && role) {
        // Store in localStorage
        this.userService.saveToken(token);
        const user={userId,role};
        this.userService.saveUser(user);
        return true;
      }
      return false;

      })
    )
  }

  // loginUser(token:any){
  //   localStorage.setItem("token",token);
  // }

  isLoggedIn():boolean{
    const token=localStorage.getItem('token');
    if(token == undefined || token==='' || token==null){
      return false;
    }else{
      return true;
    }

  }
  logout():boolean{
    localStorage.removeItem("token");
    return true;
  }
  
  getToken(){
    return localStorage.getItem('token');
  }
}
