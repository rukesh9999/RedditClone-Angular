import { Component, OnInit, Input } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/post/Post-model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  constructor(private router:Router) { }

  @Input() posts: Array<PostModel>;
  faComments = faComments;


  ngOnInit(): void {
  }

  goToPost(id: number): void {
    console.log(id)
    this.router.navigateByUrl('/view-post/' + id);
  }
}
