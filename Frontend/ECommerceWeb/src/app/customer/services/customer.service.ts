import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL="http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient,
  ) { }

  getAllPoducts(): Observable<any>{

    const token = UserStorageService.getToken();
  
      const headers=new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
       // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    return this.http.get(BASIC_URL +`api/customer/products`,{
      headers,
      responseType:'json'
    })
   }
  
   getAllProductsByName(name:any): Observable<any>{
    const token = UserStorageService.getToken();
      const headers=new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
       // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    return this.http.get(BASIC_URL+`api/customer/search/${name}`,{
      headers,
      responseType:'json'
    })
   }

   addToCart(productId:any): Observable<any>{
    const cartDto ={
      productId: productId,
      userId: UserStorageService.getUserId()

    }
    const token=UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post(BASIC_URL+`api/customer/cart`,cartDto,{
      headers,
      responseType:'text'
    })
   }

   increaseProductQuantity(productId:any): Observable<any>{
    const cartDto ={
      productId: productId,
      userId: UserStorageService.getUserId()

    }
    const token=UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post(BASIC_URL+`api/customer/addition`,cartDto,{
      headers,
      responseType:'text'
    })
   }

   decreaseProductQuantity(productId:any): Observable<any>{
    const cartDto ={
      productId: productId,
      userId: UserStorageService.getUserId()

    }
    const token=UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post(BASIC_URL+`api/customer/deduction`,cartDto,{
      headers,
      responseType:'text'
    })
   }

   getCartByUserId(): Observable<any>{
    const token=UserStorageService.getToken();
    const  userId= UserStorageService.getUserId();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(BASIC_URL+ `api/customer/cart/${userId}`,{
      headers,
      responseType: 'json'
      
    })
   }

   applyCoupon(code:any): Observable<any>{
    const token=UserStorageService.getToken();
    const  userId= UserStorageService.getUserId();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(BASIC_URL+ `api/customer/coupon/${userId}/${code}`,{
      headers,
      responseType: 'json'
      
    })
   }


   placeOrder(orderDto:any): Observable<any>{
    const token=UserStorageService.getToken();
    orderDto.userId= UserStorageService.getUserId();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(BASIC_URL+ `api/customer/placeOrder`,orderDto,{
      headers,
      responseType: 'json'
      
    })
   }

   getOrdersByUserId(): Observable<any>{
    const token=UserStorageService.getToken();
    const userId= UserStorageService.getUserId();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(BASIC_URL+ `api/customer/myOrders/${userId}`,{
      headers,
      responseType: 'json'
      
    })
   }

   getOrderedProducts(orderId:number): Observable<any>{
    const token=UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(BASIC_URL+ `api/customer/ordered-products/${orderId}`,{
      headers,
      responseType: 'json'
      
    })
   }

   giveReview(reviewDto:any): Observable<any>{
    const token=UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(BASIC_URL+ `api/customer/reviews`,reviewDto,{
      headers,
      responseType: 'json'
      
    })
   }

   getProductDetailById(productId: number): Observable<any>{
    const token=UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(BASIC_URL+ `api/customer/product/${productId}`,{
      headers,
      responseType: 'json'
      
    })
   }

   addProductToWishlist(wishlistDto:any): Observable<any>{
    const token=UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(BASIC_URL+ `api/customer/wishlist`,wishlistDto,{
      headers,
      responseType: 'json'
      
    })
   }

   getWishlistByUserId(): Observable<any>{
    const token=UserStorageService.getToken();
    const userId= UserStorageService.getUserId();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(BASIC_URL+ `api/customer/wishlist/${userId}`,{
      headers,
      responseType: 'json'
      
    })
   }
   

}
