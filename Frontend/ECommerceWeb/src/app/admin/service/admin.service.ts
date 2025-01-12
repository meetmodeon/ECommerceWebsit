import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL= "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(private http:HttpClient) { 

  }
 
  addCategory(categoryDto:any):Observable<any>{
    
    const token= UserStorageService.getToken();
    console.log(categoryDto,token);
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(BASIC_URL + 'api/admin/category',categoryDto,{
      headers,
      responseType:"json"
    })
  }

  getAllCategory():Observable<any>{
    
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(BASIC_URL + 'api/admin',{
      headers,
      responseType:"json"
    })
  }

  addProduct(productDto:any):Observable<any>{
    
    const token= UserStorageService.getToken();
    console.log(JSON.stringify(productDto));
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(BASIC_URL + 'api/admin/product',productDto,{
      headers,
      responseType:"json"
    })
  }

  updateProduct(productId:any,productDto:any):Observable<any>{
    
    const token= UserStorageService.getToken();
    console.log(JSON.stringify(productDto));
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.put(BASIC_URL + `api/admin/product/${productId}`,productDto,{
      headers,
      responseType:"json"
    })
  }

  getAllProduct():Observable<any>{
    
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(BASIC_URL + 'api/admin/products',{
      headers,
      responseType:'json'
    })
  }

  getAllProductByName(name:any):Observable<any>{
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get(BASIC_URL+`api/admin/search/${name}`,{
      headers,
      responseType:'json'
    })
  }

  getProductById(productId:number):Observable<any>{
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    
    return this.http.get(BASIC_URL+`api/admin/product/${productId}`,{
      headers,
      responseType:'json'
    })
  }


  deleteProduct(productId:any): Observable<any>{
    const token = UserStorageService.getToken();
    const headers=new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    })
    return this.http.delete(BASIC_URL +`api/admin/product/${productId}`,{
      headers,
      responseType: 'json'
    })
  }


 addCoupon(couponDto:any):Observable<any>{
    
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(BASIC_URL + 'api/admin/coupons',couponDto,{
      headers,
      responseType:"json"
    })
  }

  

 getCoupons():Observable<any>{
    
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(BASIC_URL + 'api/admin/coupons',{
      headers,
      responseType:"json"
    })
  }

  getPlaceOrders():Observable<any>{
    
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(BASIC_URL + 'api/admin/placeOrders',{
      headers,
      responseType:"json"
    })
  }

  changeOrdersStatus(orderId: number,status:string):Observable<any>{
    
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(BASIC_URL + `api/admin/order/${orderId}/${status}`,{
      headers,
      responseType:"json"
    })
  }

  postFAQ(productId:number,faqDto:any):Observable<any>{
    
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(BASIC_URL + `api/admin/faq/${productId}`,faqDto,{
      headers,
      responseType:"json"
    })
  }

  getAnalytics():Observable<any>{
    
    const token= UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(BASIC_URL + 'api/admin/order/analytics',{
      headers,
      responseType:"json"
    })
  }
  
}
