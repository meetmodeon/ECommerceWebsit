import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-track-order',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,

  ],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent {

  searchOrderForm!: FormGroup;
  order: any;

  constructor(private fb:FormBuilder,
    private authService:AuthService,
  ){}

  ngOnInit(){
    this.searchOrderForm = this.fb.group({
      trackingId: [null,[Validators.required]]
    })
  }

  submitForm(){
    this.authService.getOrderByTrackingId(this.searchOrderForm.value.trackingId).subscribe(res=>{
      console.log(res);
      this.order=res;
    })
  }

}
