import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
   
  signupForm: FormGroup;
  signupRequestPayload:SignupRequestPayload;

  constructor(private fb:FormBuilder,private _signupservice:AuthService,
         private _router:Router,private _toastr: ToastrService) {

    this.signupRequestPayload={
      username:'',
       password:'',
       email:''
    };
   }
  
  ngOnInit(): void {

    this.signupForm = this.fb.group({  
      username:  ['',[Validators.required,Validators.minLength(3)]],  
      email: ['',[Validators.required,Validators.email]], 
      password:['',[Validators.required]] 
    });  
  
  }

  get username(){
    return  this.signupForm.get('username');
   }
 
   get email(){
    return  this.signupForm.get('email');
   }
   
   get password(){
    return  this.signupForm.get('password');
   }
   
   signupform(){
     this.signupRequestPayload.email=this.signupForm.get('email').value;
     this.signupRequestPayload.username=this.signupForm.get('username').value;
     this.signupRequestPayload.password=this.signupForm.get('password').value;
     this.signup();
    }


    signup(){
    this._signupservice.signup(this.signupRequestPayload) 
    .subscribe(() => {
      this._router.navigate(['/login'], { queryParams: { registered: 'true' } });
    }, () => {
      this._toastr.error('Registration Failed! Please try again');
    });
}


}
