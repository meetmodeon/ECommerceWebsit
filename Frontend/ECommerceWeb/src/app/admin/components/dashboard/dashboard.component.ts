import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule,
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
export class DashboardComponent{
  allProducts: any[]=[];
  products: any[]=[];
  searchProductForm !: FormGroup;

  constructor(private adminService: AdminService,
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
    this.products=[];
    this.adminService.getAllProduct().subscribe(res=>{
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

    this.adminService.getAllProductByName(title).subscribe(res=>{
      res.forEach((element: { processedImg: string; byteImg: string; })=>{
        element.processedImg = 'data:image/jpeg;based64,'+ element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    })
  }

  deleteProduct(productId:any){
    this.adminService.deleteProduct(productId).subscribe(res=>{
      if(res?.body == null){
        this.snackBar.open('Product Deleted Successfully!','Close',{
          duration: 5000
        });
        this.getAllProducts();
      }else{
        this.snackBar.open(res?.message || 'An error occurred while deleting the product.','Close',{
          duration: 5000,
          panelClass: 'error-snackbar'
        })
      }
    })
  }
}
