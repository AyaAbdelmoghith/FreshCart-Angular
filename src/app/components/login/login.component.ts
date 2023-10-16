import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){}
  errMsg:string='';
  isLoading:boolean=false;
  correctMsg:string='';
 loginForm:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
},
);

handleForm():void{
  const userData=this.loginForm.value;
  this.isLoading=true;

  console.log(userData,'userData');
    if(this.loginForm.valid===true){
    this._AuthService.login(userData).subscribe({
      next:(response)=>{ //logined
        console.log(response);
        if(response.message==='success'){
          localStorage.setItem('token',response.token);
          this._AuthService.decodeUser();
          this.isLoading=false;
          this._Router.navigate(['/home']);
        }
      },
      error:(err)=>{//an error
        console.log(err,'err');
        if(err.error.statusMsg==='fail'){
          this.isLoading=false;
          this.errMsg=err.error.message;
        }
      }
    })

  }
}
}
