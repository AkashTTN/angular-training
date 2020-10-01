import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { tap } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  posts: Post[];
  isFetchingPosts: boolean;
  isSubmittingPost: boolean;
  isRequestSent: boolean;
  error: boolean;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this._getPosts();
  }

  onSubmit() {
    this._createPost();
  }

  onFetchPosts() {
    this._getPosts();
  }

  _createPost() {
    // console.log(this.form);
    const postData = {
      title: this.form.value.postTitle,
      body: this.form.value.postBody
    };

    this.error = false;
    this.isSubmittingPost = true;

    this.postsService.createPost(postData)
      // .pipe(tap((event) => {
      //   if(event.type === HttpEventType.Sent) {
      //     this.isRequestSent = true;
      //     console.log('hi')
      //   }
      // }))
      .subscribe((res) => {
        this.isSubmittingPost = false;
        this.form.reset();
        console.log('Post Submitted', res)
      }, (error) => {
        this.isSubmittingPost = false;
        this.error = true;
        console.log('Error submitting post.');
      })

  }

  _getPosts() {
    this.error = false;
    this.isFetchingPosts = true;
    this.postsService.getPosts().subscribe((posts: Post[]) => {
      this.isFetchingPosts = false;
      this.posts = posts;
    }, (error) => {
      console.log(error);
      this.isFetchingPosts = false;
      this.error = true;
    });
  }

}
