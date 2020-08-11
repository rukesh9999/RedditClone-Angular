import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-model';
import { PostModel } from '../post/Post-model';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private _http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this._http.get<Array<SubredditModel>>
     ('http://springredditclone.us-east-2.elasticbeanstalk.com/api/subreddit/getsubreddits');
  }


  getSubreddit(id:number): Observable<SubredditModel> {
    console.log(id+"...id")
    return this._http.get<SubredditModel>
    ('http://springredditclone.us-east-2.elasticbeanstalk.com/api/subreddit/getsubreddit/'+id);
  }

  
  createSubreddit(subredditmodel: SubredditModel): Observable<any> {
    console.log("create subreddit service called...");  

    console.log(subredditmodel);  
    return this._http.post('http://springredditclone.us-east-2.elasticbeanstalk.com/api/subreddit/savesubreddit',
    subredditmodel);
  }

}
