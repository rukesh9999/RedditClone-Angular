import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError:boolean;
  registerSuccessMessage: string;
  showSpinner:boolean=false;

  constructor(private fb:FormBuilder, private _loginservice:AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router, private _toastr: ToastrService) {
    
  this.loginRequestPayload={
     username:'',
     password:''
  };
 
  }
  
  ngOnInit(): void {

    this.loginForm = this.fb.group({  
      username:  ['',[Validators.required,Validators.minLength(3)]],   
      password:['',[Validators.required]] 
    });  


    this._activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this._toastr.success('Signup Successful');
          this._toastr.success('Please Check your inbox for activation email '
            + 'activate your account before you Login!');
        }
      });

   }

  
get username(){
  return  this.loginForm.get('username');
 }

 get password(){
  return  this.loginForm.get('password');
 }
 
 
   loginform(){
     console.log("login method called...");
   
     console.log(this.loginForm.get('username').value+"...."+this.loginForm.get('password').value);

   this.loginRequestPayload.username=this.loginForm.get('username').value;
   this.loginRequestPayload.password=this.loginForm.get('password').value;
   this.showSpinner=true;
   this.show_Spinner();
   this.login();
   }

  login()
  {
      this._loginservice.login(this.loginRequestPayload)
      .subscribe(data=>{
        if (data) {
          console.log("login success....",data)
          this.isError = false;                                                             
          this._router.navigateByUrl('');
          this._toastr.success('Login Successful');
            this._router.navigateByUrl('').then(() => {
             window.location.reload();
             })
        } else {
          this.isError = true;
        }
      });

   }


 show_Spinner()
 {
   setTimeout(()=>{
    this.showSpinner=false;
   },9000)
 }   

}
