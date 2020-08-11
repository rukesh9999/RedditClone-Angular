import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { SubredditModel } from '../subreddit-model';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm: FormGroup;
  subredditmodel: SubredditModel;
  showSpinner:boolean=false;

   constructor(private router: Router, 
               private subredditService: SubredditService)
   { 
      this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
}
  ngOnInit(): void {

    this.subredditmodel = {
      name: '',
      description: ''
    }
  
  }


  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    console.log("create subreddit called...");  

    this.subredditmodel.name = this.createSubredditForm.get('title').value;
    this.subredditmodel.description = this.createSubredditForm.get('description').value;
    this.showSpinner=true;
    this.show_Spinner()
    this.subredditService.createSubreddit(this.subredditmodel).subscribe(data => {
      console.log(data);  
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      console.log('Error occurred');
    })
  }


  show_Spinner()
  {
    setTimeout(()=>{
     this.showSpinner=false;
    },11000)
  }   
 
}
