import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';
import { AuthService } from './auth/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject = new BehaviorSubject(null);

    constructor(public _authService:AuthService) { }

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
    {
        console.log("entered into....interecept")    
        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        
      const jwtToken = this._authService.getJwtToken()
      
      if (jwtToken) {
        return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse
                && error.status === 403) {
                return this.handleAuthErrors(req, next);
            } else {
                return throwError(error);
            }
        }));
    }
    return next.handle(req);

}
    private handleAuthErrors(req:HttpRequest<any> ,next:HttpHandler):Observable<HttpEvent<any>>
    {
        console.log("handleAuthErrors ....")    

         if(!this.isTokenRefreshing){
            console.log("!this.isTokenRefreshing ....",!this.isTokenRefreshing)    

            this.isTokenRefreshing=true;
            this.refreshTokenSubject.next(null);

            return this._authService.refreshToken().pipe(   

                switchMap((refreshTokenResponse: LoginResponse) => {
                    console.log("refreshTokenResponse ....",refreshTokenResponse);   

                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
                })
            )

         }

         else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this._authService.getJwtToken()))
                })
            );
        }
    }

   private addToken(req:HttpRequest<any>,jwtToken:any)
   {
    console.log("add token method...",req.body)
    console.log("jwttoken.....",jwtToken);
     return req.clone({
        
         headers:req.headers.set('Authorization','Bearer '+jwtToken)
     });
      console.log("token added........")
   }
   
}