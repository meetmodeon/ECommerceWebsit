import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-update-product',
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
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

   productForm!: FormGroup;
    listOfCategories: any=[];
    selectedFile!: File;
    imagePreview: string | ArrayBuffer | null|any;

    productId!:number;

    existingImage!: string | number| null;

    imgChanged = false;
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private snackBar: MatSnackBar,
      private adminService: AdminService,
      private activatedRoute: ActivatedRoute
  
    ){
      this.getAllCategories();
    }
    onFileSelected(event:any){
      this.selectedFile=event.target.files[0];
      this.previewImage();
      this.imgChanged = true;

      this.existingImage=null;
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

      const productIdParam = this.activatedRoute.snapshot.params['productId'];
    this.productId = productIdParam ? +productIdParam : 0;
    this.getAllCategories();
    this.getProductById();
     
    }
    getAllCategories(){
      this.adminService.getAllCategory().subscribe(res=>{
        this.listOfCategories = res;
      })
    }

    getProductById(){
      this.adminService.getProductById(this.productId).subscribe(res=>{
        this.productForm.patchValue(res);
        this.existingImage= 'data:image/jpeg;base64,'+res.byteImg;
      })
    }

    updateProduct():void{
      if (this.productForm.valid) {
        const formData = new FormData();
        if(this.imgChanged && this.selectedFile){
          formData.append('img',this.selectedFile);
        }

        formData.append('categoryId',this.productForm.value.categoryId);
        formData.append('name',this.productForm.value.name);
        formData.append('price',this.productForm.value.price);
        formData.append('description',this.productForm.value.description);
  
  
        
       
        console.log('FormData being sent:'+formData);
        this.adminService.updateProduct(this.productId,formData).subscribe((res)=>{
          if(res.id!=null){
            this.snackBar.open('Product update Successfully!','Close',{
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
