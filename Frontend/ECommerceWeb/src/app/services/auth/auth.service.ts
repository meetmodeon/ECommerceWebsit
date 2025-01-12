import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { Interface } from 'readline';
import { LoginData } from '../../interfaces/login-data';

const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
    private userStorageService: UserStorageService
  ) { }
  register(signupRequest:any): Observable<any>{
    return this.http.post(BASIC_URL+"sign-up",signupRequest);
  }

  getOrderByTrackingId(trackingId: number):Observable<any>{
    // const headers = new HttpHeaders({
    //   'X-Requested-With': 'XMLHttpRequest',
    //   //'Content-Type': 'application/json',
      
    // });
     return this.http.get(BASIC_URL+ `order/${trackingId}`);
  }
  
}
