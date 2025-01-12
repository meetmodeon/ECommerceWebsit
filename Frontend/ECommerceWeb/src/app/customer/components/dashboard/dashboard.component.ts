import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-customer-dashboard',
  imports: [
    RouterModule,
        MatCardModule,
        CommonModule,
        MatButtonModule,
        MatDivider,
        ReactiveFormsModule,
        MatFormField,
        MatIconModule,
        MatLabel,
        MatInputModule,
    
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

   allProducts: any[]=[];
    products: any[]=[];
    searchProductForm !: FormGroup;
  
    constructor(private customerService: CustomerService,
      private fb:FormBuilder,
      private snackBar: MatSnackBar,
  
  
    ){}
    ngOnInit(){
     
      this.getAllProducts();
      this.searchProductForm= this.fb.group({
        title: [null,[Validators.required]]
      });
      
    }
  
  
    getAllProducts(){
      // this.products=[];
      this.customerService.getAllPoducts().subscribe(res=>{
        this.allProducts=res.forEach((element: { processedImg: string; byteImg: string; }) => {
          element.processedImg= 'data:image/jpeg;base64,'+element.byteImg;
          this.products.push(element);
        });
        this.products = [...this.allProducts];
      })
    }
  
    submitForm(){
      this.products=[];
  
      if(this.searchProductForm.invalid){
        return;
      }
  
      const title = this.searchProductForm.value.title;
      
      if(!title){
        this.products=[...this.allProducts];
        return;
      }
  
      this.customerService.getAllProductsByName(title).subscribe(res=>{
        res.forEach((element: { processedImg: string; byteImg: string; })=>{
          element.processedImg = 'data:image/jpeg;based64,'+ element.byteImg;
          this.products.push(element);
        });
        console.log(this.products);
      })
    }

    addToCart(id:any){
      console.log(id);
     this.customerService.addToCart(id).subscribe(res=>{
      this.snackBar.open("Product added to cart successfully","Close",{duration:5000})
     })
    }

}
