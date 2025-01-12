import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-product-detail',
  imports: [
    CommonModule,
    MatIconModule,
    
    
  ],
  templateUrl: './view-product-detail.component.html',
  styleUrl: './view-product-detail.component.scss'
})
export class ViewProductDetailComponent {

  productId!: number;

  product:any;
  FAQS: any[] = [];
  reviews: any[]=[];

  constructor(private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    const paramsProductId= this.activatedRoute.snapshot.params['productId'];
    this.productId=paramsProductId?+paramsProductId:0;

    this.getProductDetailsById();
  }

  getProductDetailsById(){
    this.customerService.getProductDetailById(this.productId).subscribe(res=>{
      this.product =res.productDto;
      this.product.processedImg= 'data:image/png;base64,' + res.productDto.byteImg;
      this.FAQS=res.faqDtoList;

      res.reviewDtoList.forEach((element: { processedImg: string; returnedImg: string; })=>{
        element.processedImg='data:image/png;base64,'+element.returnedImg;
        this.reviews.push(element);
      })
    })
  }

  addToWishlist(){
    const wishListDto ={
      productId: this.productId,
      userId: UserStorageService.getUserId()
    }
    this.customerService.addProductToWishlist(wishListDto).subscribe(res=>{
      if(res.id !=null){
        this.snackBar.open("Product Added to Wishlist Successfully!",'Close',{duration: 5000});
      }else{
        this.snackBar.open("Already in Wishlist",'ERROR',{
          duration: 5000
        });
      }
    })
  }
}
