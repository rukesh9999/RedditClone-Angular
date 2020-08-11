import { Injectable, Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../sign-up/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  constructor(private _http:HttpClient,private localStorage: LocalStorageService) { }
  private  base_url="http://springredditclone.us-east-2.elasticbeanstalk.com/api/auth/signup";

  signup(signuprequestpayload:SignupRequestPayload):Observable<any>
  {
     return this._http.post(this.base_url,signuprequestpayload,{responseType:'text'});  
  }

  login(loginrequestpayload:LoginRequestPayload):Observable<boolean>
  {
    console.log("loginrequestpayload.......",loginrequestpayload)
    return this._http.post<LoginResponse>("http://springredditclone.us-east-2.elasticbeanstalk.com/api/auth/login",loginrequestpayload)
    .pipe(map(data=>{
      console.log("loginresponse...",data)
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.loggedIn.emit(true);
        this.username.emit(data.username);
    
      return true;
    })); 
  }


  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    return this._http.post<LoginResponse>('http://springredditclone.us-east-2.elasticbeanstalk.com/api/auth/refresh/token',
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }


  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getJwtToken()
  {
    return this.localStorage.retrieve('authenticationToken');
  }


  
  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

 

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  logout() {
    this._http.post('http://springredditclone.us-east-2.elasticbeanstalk.com/api/auth/logout', this.refreshTokenPayload,
    { responseType: 'text' })
    .subscribe(data => {
    console.log(data);
    }, error => {
    throwError(error);
    })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    }
    

  
}
