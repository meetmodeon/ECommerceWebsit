import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupons',
  imports: [
    MatTableModule,
    CommonModule,
    
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent {

  coupons: any;
  constructor(private adminService: AdminService){}

  ngOnInit(){
    this.getCoupons();
  }

  getCoupons(){
    this.adminService.getCoupons().subscribe(res=>{
      this.coupons=res;
    })
  }

}
