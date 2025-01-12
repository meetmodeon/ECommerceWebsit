import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { CreateProduct } from '../../../interfaces/create-product';

@Component({
  selector: 'app-post-product',
  imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule


  ],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent  {

  productForm!: FormGroup;
  listOfCategories: any=[];
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null|any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,

  ){
    this.getAllCategories();
  }
  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload=()=>{
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(this.selectedFile)
  }
  ngOnInit():void{
    this.productForm = this.fb.group({
      categoryId: [null,[Validators.required]],
      name: [null,[Validators.required]],
      price: [null, [Validators.required]],
      description: [null,[Validators.required]]
    });
   
  }
  getAllCategories(){
    this.adminService.getAllCategory().subscribe(res=>{
      this.listOfCategories = res;
    })
  }
  addProduct():void{
    if (this.productForm.valid) {
      // let productData: CreateProduct={
      //   categoryId:this.productForm.value.categoryId ,
      //   name:this.productForm.value.name,
      //   price:this.productForm.value.price,
      //   description: this.productForm.value.description,
      //  img:this.selectedFile

      // };
      console.log(this.productForm.value)
      const formData = new FormData();
      formData.append('categoryId',this.productForm.value.categoryId);
      formData.append('name',this.productForm.value.name);
      formData.append('price',this.productForm.value.price);
      formData.append('description',this.productForm.value.description);

      if(this.selectedFile){
        formData.append('img',this.selectedFile);
      }

      
     
      console.log('FormData being sent:'+formData);
      this.adminService.addProduct(formData).subscribe((res)=>{
        if(res.id!=null){
          this.snackBar.open('Product Posted Successfully!','Close',{
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackBar.open(res.message,'ERROR',{
            duration: 5000
          });
        }
      })

    }else{
      for(const i in this. productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
  
}
