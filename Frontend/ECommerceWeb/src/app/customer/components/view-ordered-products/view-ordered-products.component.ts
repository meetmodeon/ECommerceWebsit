import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-ordered-products',
  imports: [
    MatCardModule,
    MatDivider,
    CommonModule,
    RouterModule,

  ],
  templateUrl: './view-ordered-products.component.html',
  styleUrl: './view-ordered-products.component.scss'
})
export class ViewOrderedProductsComponent {

  orderId:any;
  orderedProductDetailsList:any[] =[];
  totalAmount:any;

  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ){}
  ngOnInit(){
    const orderParms=this.activatedRoute.snapshot.params['orderId'];
    this.orderId=orderParms?+orderParms:0;

    this.getOrderedProductsDetailsByOrderId()
  }

  getOrderedProductsDetailsByOrderId(){
    this.customerService.getOrderedProducts(this.orderId).subscribe(res=>{
      res.productDtoList.forEach((element: { processedImg: string; byteImg: string; })=>{
        element.processedImg='data:image/jpeg;base64,'+ element.byteImg;
        this.orderedProductDetailsList.push(element);
      });
      this.totalAmount = res.orderAmount;
    })
  }

}
