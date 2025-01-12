import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cart',
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatCardContent,
    MatDivider,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatFormFieldModule

    

  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: any[] =[];
  order:any;

  couponForm!:FormGroup;

  constructor(private customerService:CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog:MatDialog,

  ){}

  ngOnInit():void{
    this.getCart();
    this.couponForm = this.fb.group({
      code: [null,[Validators.required]]
    })
  }

  applyCoupon(){
    this.customerService.applyCoupon(this.couponForm.value.code).subscribe(res=>{
      this.snackBar.open('Coupon Applied Successfully','Close',{
        duration: 5000
      });
      this.getCart();
    },error=>{
      this.snackBar.open(error.error,'Close',{
        duration: 5000
      })
    }
  )
  }

  getCart(){
    this.cartItems=[];
    this.customerService.getCartByUserId().subscribe(res=>{
      this.order=res;
      res.cartItems.forEach((element: { processedImg: string; returnedImg: string; })=>{
        element.processedImg ='data:image/jpeg;base64,'+element.returnedImg;
        this.cartItems.push(element);
      })
    })
  }

  increaseQuantity(productId: any){
    this.customerService.increaseProductQuantity(productId).subscribe(res=>{
      this.snackBar.open('Product quantity increased.','Close',{
        duration: 5000
      });
      this.getCart();
    })
  }

  decreaseQuantity(productId: any){
    this.customerService.decreaseProductQuantity(productId).subscribe(res=>{
      this.snackBar.open('Product quantity decreased.','Close',{
        duration: 5000
      });
      this.getCart();
    })
  }

  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }

}
