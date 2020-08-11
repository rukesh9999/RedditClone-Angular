import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { Observable } from 'rxjs';
import { SubredditModel } from '../subreddit-model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/post/post.service';
import { PostModel } from 'src/app/post/Post-model';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {

  constructor(private subredditservice:SubredditService,
              private _activatedroute:ActivatedRoute,
              private postservice:PostService) { }

  id:number;
  subreddit:SubredditModel;
  posts:Array<PostModel>;
  ngOnInit(): void {
    this.id=this._activatedroute.snapshot.params.id;
    console.log("id..."+this.id)
    this.getSubreddit();
    this.getPostsBySubreddit();
  }


  getSubreddit() {
    this.subredditservice.getSubreddit(this.id).subscribe((data)=>{
      console.log(data)
      this.subreddit=data;
    },
    (error)=>{
      console.log(error)
    })
  }

  getPostsBySubreddit()
  {
    this.postservice.getPostsBySubreddit(this.id).subscribe((data)=>{
      console.log("posts by subreddit...",data)
      this.posts=data;
    },
    (error)=>{
      console.log(error)
    })
  }

  

}
