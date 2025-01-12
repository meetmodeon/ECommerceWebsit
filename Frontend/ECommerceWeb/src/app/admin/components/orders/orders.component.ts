import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu'

@Component({
  selector: 'app-orders',
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatMenuModule,
    MatCardContent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: any;

  constructor(private adminService: AdminService,
    private snackBar:MatSnackBar,

  ){}

  ngOnInit(){
    this.getPlaceOrders();
  }
  
  getPlaceOrders(){
    this.adminService.getPlaceOrders().subscribe(res=>{
      this.orders=res;
    })
  }
  changeOrderStatus(orderId: number,status:string){
    this.adminService.changeOrdersStatus(orderId,status).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open("Order Status changed successfully","Close",{duration:5000});
        this.getPlaceOrders();
      }else{
        this.snackBar.open("Something went wrong","Close",{duration: 5000});
      }
    })
  }
}
