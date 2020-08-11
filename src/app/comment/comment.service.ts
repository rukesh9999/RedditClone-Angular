import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from './comment-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http:HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<any> {
    return this._http.get('http://springredditclone.us-east-2.elasticbeanstalk.com/api/comments/comments-by-post/'
                                                         + postId);
  }

  postComment(commentpayload: CommentPayload): Observable<any> {
    console.log("service...."+commentpayload);
    let  text=commentpayload.text;
     console.log(text+"......."+commentpayload.postId)
     const _data ={
      "text":text,
      "postId":commentpayload.postId,
  }
    return this._http.post('http://springredditclone.us-east-2.elasticbeanstalk.com/api/comments/savecomment', 
     _data);
  }

  getAllCommentsByUser(name: string) {
    return this._http.get<CommentPayload[]>
      ('http://springredditclone.us-east-2.elasticbeanstalk.com/api/comments/comments-by-user/' + name);
  }

}
