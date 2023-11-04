import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotpassService } from 'src/app/core/services/forgotpass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  constructor(private _ForgotpassService:ForgotpassService,private _Router:Router){}
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  email:string='';
  userMsg:string=''; 
  
  forgotPassForm:FormGroup=new FormGroup({
    email:new FormControl('')
  });

  resetCodeForm:FormGroup=new FormGroup({
    resetCode:new FormControl('')
  });

  resetPassForm:FormGroup=new FormGroup({
    resetPass:new FormControl('')
  });

  forgotPassword():void{
    let userEmail=this.forgotPassForm.value;
    this.email=userEmail.email;
      this._ForgotpassService.forgotPassword(userEmail).subscribe({
        next:(response)=>{
          console.log(response);
          this.userMsg=response.message;
          this.step1=false;
          this.step2=true;
          
        },
        error:(err)=>{
          this.userMsg=err.error.message;
        }
      })
  }
  resetCode():void{
    let resetCode=this.resetCodeForm.value
    this._ForgotpassService.resetCode(resetCode).subscribe({
      next:(response)=>{
        console.log(response);
        this.userMsg=response.status;
        this.step2=false;        
        this.step3=true;      
      },
      error:(err)=>{
        this.userMsg=err.error.message;
      }
    });
  }
  resetPassword():void{
    let resetForm=this.resetPassForm.value;
    resetForm.email=this.email;
    this._ForgotpassService.resetPass(resetForm).subscribe({
      next:(response)=>{
        console.log(response);
        // this.userMsg=response.message;
        if(response?.token){
          localStorage.setItem('token',response.token)
          this._Router.navigate(['/home'])
        }
      },
      error:(err)=>{
        this.userMsg=err.error.message;
      }
    })
  }



}
