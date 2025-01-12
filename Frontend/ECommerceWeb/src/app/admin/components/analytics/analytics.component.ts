import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { OrderByStatusComponent } from "./order-by-status/order-by-status.component";
import { CommonModule } from '@angular/common';
import { MatCardAvatar, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-analytics',
  imports: [OrderByStatusComponent,
    CommonModule,
    MatCardModule,
    MatCardAvatar,
    
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  data:any;

  constructor(private adminService: AdminService){}

  ngOnInit(){
    this.adminService.getAnalytics().subscribe(res=>{
      console.log(res);
    })
  }

}
