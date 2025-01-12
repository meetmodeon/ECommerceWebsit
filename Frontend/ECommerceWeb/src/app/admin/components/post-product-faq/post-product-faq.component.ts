import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {   ActivatedRoute, Router} from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-product-faq',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    
    
  ],
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss'
})
export class PostProductFaqComponent {

  productId!: number ;
  FAQForm !: FormGroup;

  constructor(private fb:FormBuilder,
    private router:Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit(){
    const productIdParam = this.activatedRoute.snapshot.params['productId'];
    this.productId = productIdParam ? +productIdParam : 0;

    this.FAQForm=this.fb.group({
      question:[null,[Validators.required]],
      answer: [null,[Validators.required]],
    })
  }

  postFAQ(){
    this.adminService.postFAQ(this.productId,this.FAQForm.value).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open('FAQ Posted Successfully!','Close',{
          duration: 5000
        });
        this.router.navigateByUrl("/admin/dashboard");
      }else{
        this.snackBar.open("Something went wrong",'Close',{
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    })
  }
}
