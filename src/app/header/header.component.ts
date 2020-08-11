import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../auth/login/login-response.payload';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  isLoggedIn: boolean;
  username: string;

  
  constructor(private authService: AuthService,
              private router: Router,
              private httpClient:HttpClient,
              private localStorage: LocalStorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
   
  }


  
  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }


  logout() {
    this.authService.logout();
    this.router.navigateByUrl('').then(() => {
    window.location.reload();
    })
  }

  
}
