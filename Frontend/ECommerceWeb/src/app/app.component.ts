import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { UserStorageService } from './services/storage/user-storage.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceWeb';

  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router){
  }
  ngOnInit():void{
    this.router.events.subscribe(event =>{
      this.isAdminLoggedIn=UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn=UserStorageService.isCustomerLoggedIn();
    })
  }
  
  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
