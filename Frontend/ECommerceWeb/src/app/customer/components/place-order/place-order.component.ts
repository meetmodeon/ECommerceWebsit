import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-place-order',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatError,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {

  orderForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(){
    this.orderForm=this.fb.group({
      address: [null,[Validators.required]],
      orderDescription: [null],
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open("Order placed successfully","Close",{duration: 5000});
        this.router.navigateByUrl('/customer/my-orders');
        this.closeForm();
      }else{
        this.snackBar.open("Something went wrong","Close",{ duration: 5000})
      }
    })
  }

  closeForm(){
    this.dialog.closeAll();
  }
}
