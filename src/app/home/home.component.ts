import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post/Post-model';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$: Array<PostModel> = [];
  showSpinner:boolean=false;

  constructor(private _postservice:PostService) {
    this.showSpinner=true;
    this.show_Spinner();
    this._postservice.getAllPosts().subscribe(post => {
      console.log(post)
      this.posts$ = post;
      
    })
   };

  ngOnInit(): void {
    for(let post of this.posts$)
    {
     console.log(post);
    }
  }


  show_Spinner()
 {
   setTimeout(()=>{
    this.showSpinner=false;
   },8000)
 }   

}
