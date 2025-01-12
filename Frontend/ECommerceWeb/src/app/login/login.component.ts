import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router,RouterModule } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';
import { LoginData } from '../interfaces/login-data';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-login',
  imports: [
     CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!:FormGroup;
  hidePassword = true;
  constructor(private fb:FormBuilder,
    private snackBar:MatSnackBar,
    private saveUser:UserStorageService,
    private authService: AuthService,
    private router: Router,
    private http:HttpClient,
    private loginService: LoginService
  ){}
  ngOnInit():void{
    this.loginForm=this.fb.group({
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required]]
    })
  }
  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }
   onSubmit():void{
    if(this.loginForm.valid){
      const logindata: LoginData={
        username:this.loginForm.value.email|| '',
        password:this.loginForm.value.password || '',
      };
      this.loginService.doLogin(logindata.username,logindata.password).subscribe({
        next:(res:any)=>{
      
          if(UserStorageService.isAdminLoggedIn()){
            this.router.navigateByUrl('admin/dashboard')
          }
          else if(UserStorageService.isCustomerLoggedIn()){
            this.router.navigateByUrl('customer/dashboard');
          }
        },
        error:(err:any)=>{
          this.snackBar.open('Bad credentials','ERORR',{duration: 5000});

        }
      })

//1hr:14min:code_with_project

      
    }
     

  }

}
