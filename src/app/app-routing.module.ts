import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { ViewSubredditComponent } from './subreddit/view-subreddit/view-subreddit.component';

const routes: Routes = [ {path:'',component:HomeComponent},
                         {path:'user-profile/:name',component:UserProfileComponent,
                                    canActivate: [AuthGuard]},

                         { path: 'list-subreddits', component:
                                        ListSubredditsComponent},
                         { path: 'view-post/:id', component:
                                         ViewPostComponent },
                         { path: 'create-post', component:CreatePostComponent,
                                          canActivate: [AuthGuard] },
                         { path: 'create-subreddit', component:CreateSubredditComponent,
                                          canActivate: [AuthGuard]},
                         {path:'sign-up',component:SignUpComponent},
                         {path:'login',component:LoginComponent},
                         { path: 'view-post/:id', component: ViewPostComponent },
                         { path: 'view-subreddit/:id', component: ViewSubredditComponent },

                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
