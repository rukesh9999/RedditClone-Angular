import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';
import { SubredditModel } from '../subreddit-model';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits: Array<SubredditModel>;
  showSpinner:boolean=true;
  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    this.show_Spinner();
    this.subredditService.getAllSubreddits().subscribe(data => {
      console.log("data..."+data)
      this.subreddits = data;
    }, error => {
      throwError(error);
    })

  }
 
  show_Spinner()
  {
    setTimeout(()=>{
     this.showSpinner=false;
    },2000)
  }   

}
