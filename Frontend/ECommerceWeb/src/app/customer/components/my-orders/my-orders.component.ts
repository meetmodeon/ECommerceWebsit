import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {

  myOrders:any;

  constructor(private customerService: CustomerService){}

  ngOnInit(){
    this.getMyOrders();
  }

  getMyOrders(){
    this.customerService.getOrdersByUserId().subscribe(res=>{
      this.myOrders=res;
    })
  }
}
