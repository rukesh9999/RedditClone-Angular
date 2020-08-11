import { Component, OnInit } from '@angular/core';
import { CommentPayload } from 'src/app/comment/comment-payload';
import { CommentService } from 'src/app/comment/comment.service';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/post/Post-model';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;
  showSpinner:boolean=true;

  constructor(private activatedRoute: ActivatedRoute, 
              private postService: PostService,
              private commentService: CommentService) { 
                 
                this.show_Spinner();
                this.name = this.activatedRoute.snapshot.params.name;

                this.postService.getAllPostsByUser(this.name).subscribe(data => {
                  console.log("all posts.."+data)
                  this.posts = data;
                  this.postLength = data.length;
                });
                this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
                  console.log("all comments.."+data)
                  this.comments = data;
                  this.commentLength = data.length;
                });
            

              }

  ngOnInit(): void {
  }

  show_Spinner()
  {
    setTimeout(()=>{
     this.showSpinner=false;
    },11000)
  }   


}
