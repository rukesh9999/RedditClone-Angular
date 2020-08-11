import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { VotePayload } from './vote-payload';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { VoteService } from './vote.service';
import { PostService } from 'src/app/post/post.service';
import { PostModel } from 'src/app/post/Post-model';
import { VoteType } from './vote-type';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input('post') post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;

  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService, private toastr: ToastrService) { 

      this.votePayload = {
        voteType: undefined,
        postId: undefined
      }
      this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  
    }

  ngOnInit(): void {
  }


  upvotePost() {
    console.log("upvote method called...")
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    console.log("upvote method called...")
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.postId;
    console.log("votepayload...",this.votePayload)
    this.voteService.vote(this.votePayload).subscribe(() => {
    console.log("vote sucess...")

      this.updateVoteDetails();
    }, error => {
      let _error:String = error.error.message;
      if("java.lang.String cannot be cast to org.springframework.security.core.userdetails.User"===_error)
      { 
      this.toastr.error("User Not LoggedIn In ...Please Login...");
      }
      else{
        this.toastr.error(error.error.message);

      }
      throwError(error);
    });
  }

  private updateVoteDetails() {
    console.log("entered into update vote details...")

    this.postService.getPost(this.post.postId).subscribe(post => {
      console.log("post...",post)
      this.post = post;
    });
  }

}
