import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    console.log("vote service called....")
    return this.http.post('http://springredditclone.us-east-2.elasticbeanstalk.com/api/vote', votePayload);
  }
}
