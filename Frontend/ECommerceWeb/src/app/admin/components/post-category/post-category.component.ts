import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {

  categoryForm !: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ){
    console.log("post component is called");
  }

  ngOnInit():void{
    this.categoryForm= this.fb.group({
      name:[null,[Validators.required]],
      description: [null,[Validators.required]],
    })
  }
  addCategory():void{
    //debugger;
    if(this.categoryForm.valid){
      this.adminService.addCategory(this.categoryForm.value).subscribe(
        (res:any)=>{
        if(res.id != null){
          this.snackBar.open('Category Posted Successfully!','Close',{
            duration:5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackBar.open(res.message, 'Close',{
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      },
      (err) => {
        this.snackBar.open('An error occurred!', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    )
    }else{
      this.categoryForm.markAllAsTouched();
    }
  }

}
