import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  constructor(private _subredditService: SubredditService) { }
  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean;

  ngOnInit(): void {
    this._subredditService.getAllSubreddits().subscribe(data => {
      if (data.length >= 4) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }

  

}
