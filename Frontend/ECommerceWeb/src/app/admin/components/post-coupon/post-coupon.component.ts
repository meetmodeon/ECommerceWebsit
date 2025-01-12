import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-coupon',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatError,
    MatLabel,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  couponForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private router:Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ){}

  ngOnInit(){
    this.couponForm=this.fb.group({
      name: [null,[Validators.required]],
      code: [null,[Validators.required]],
      discount: [null,[Validators.required]],
      expirationDate: [null,[Validators.required]],
    })
  }

  addCoupon(){
    if(this.couponForm.valid){
      this.adminService.addCoupon(this.couponForm.value).subscribe(res=>{
        if(res.id != null){
          this.snackBar.open('Coupon Posted Successfully!','Close',{
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackBar.open(res.message,'Close',{
            duration: 5000,
            panelClass: 'error-snackbar'
          })
        }
      })
    }else{
      this.couponForm.markAllAsTouched();
    }
  }
}
