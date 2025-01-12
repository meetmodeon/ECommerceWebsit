import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { response } from 'express';
import { subscribe } from 'diagnostics_channel';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { SignupData } from '../interfaces/signup-data';
@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  signupForm!:FormGroup;
  hidePassword = true;
  constructor(private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ){}
  ngOnInit():void{
    this.signupForm=this.fb.group({
      name: [null,[Validators.required]],
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required]],
      confirmPassword: [null,[Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword= !this.hidePassword;

  }
  onSubmit():void{
    const signupData: SignupData={
      name:this.signupForm.value.name || '',
      email:this.signupForm.value.email || '',
      password: this.signupForm.value.password || '',
      confirmPassword: this.signupForm.value.confirmPassword || ''
    }
    if(signupData.password !== signupData.confirmPassword){
      this.snackBar.open('Password do not match.','Close',{duration:5000,panelClass: 'error-snackbar'});
      return;
    }

    this.authService.register(signupData).subscribe({
      next:(response:any)=>{
        this.snackBar.open('Sign up successfull','Close',{duration:5000});
        this.router.navigateByUrl("/login");
      },
      error:(error:any)=>{
        this.snackBar.open('Sign up failed. Please try again.','Close',{duration:5000,panelClass: 'error-snackbar'});
      }
    })
  }
}
