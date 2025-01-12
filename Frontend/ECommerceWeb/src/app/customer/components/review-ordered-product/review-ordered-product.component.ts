import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-review-ordered-product',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatError,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatOptionModule,
    MatInputModule,


  ],
  templateUrl: './review-ordered-product.component.html',
  styleUrl: './review-ordered-product.component.scss'
})
export class ReviewOrderedProductComponent {
  productId!: number;
  reviewForm!: FormGroup;
  selectedFile!: File | null|any;
  imagePreview!: string|ArrayBuffer|null;


  constructor(private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private customerService:CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ){}

   ngOnInit(){
   const paramsProductId=this.activatedRoute.snapshot.params['productId'];
    this.productId=paramsProductId?+paramsProductId:0;

    this.reviewForm=this.fb.group({
      rating: [null,[Validators.required]],
      description: [null,[Validators.required]]
    })
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
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm(){
    const formData: FormData=new FormData();

    formData.append('productId',this.productId.toString());
    formData.append('userId',UserStorageService.getUserId().toString());
    formData.append('rating',this.reviewForm.value.rating);
    formData.append('description',this.reviewForm.value.description);
    if(this.selectedFile){
      formData.append('img',this.selectedFile);
    }


    this.customerService.giveReview(formData).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open('Revies Posted Successfully!','Close',{duration:5000});
        this.router.navigateByUrl('/customer/my_orders');
      }else{
        this.snackBar.open("Something went wrong",'ERROR',{duration:5000});
      }
    })
  }



}
