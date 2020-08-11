import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './Post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from './create-post/create-post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http:HttpClient) { 
    
  }

 
  getAllPosts(): Observable<Array<PostModel>> {
    return this._http.get<Array<PostModel>>('http://springredditclone.us-east-2.elasticbeanstalk.com/api/posts/getposts');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    console.log(postPayload)
    return this._http.post('http://springredditclone.us-east-2.elasticbeanstalk.com/api/posts/savepost', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
        console.log("id..."+id)
    return this._http.get<PostModel>('http://springredditclone.us-east-2.elasticbeanstalk.com/api/posts/getpost/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    console.log("getAllPostsByUser... "+name)
    return this._http.get<PostModel[]>('http://springredditclone.us-east-2.elasticbeanstalk.com/api/posts/by-user/' +name);
  }
  
  getPostsBySubreddit(id:number):Observable<Array<PostModel>>
  {
     return this._http.get<Array<PostModel>>('http://springredditclone.us-east-2.elasticbeanstalk.com/api/posts/by-subreddit/' +id); 
  }

}
