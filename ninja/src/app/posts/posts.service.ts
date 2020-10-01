import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService implements OnInit, OnDestroy {

    endpoint = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http.get(this.endpoint)
            .pipe(map((posts: Post[]) => {
                return posts.map((post) => {
                    return { ...post, title: post.title.toUpperCase() }
                });
            }));
    }

    createPost(postData) {
        // console.log('data', postData)
        // const parsedPostData = JSON.stringify(postData);

        return this.http.post(this.endpoint, { ...postData, random: 1 }, {
            headers: new HttpHeaders({ 'Custom-Header': 'Value' }),
            // observe: 'events'
        })
    }

    ngOnInit() { }

    ngOnDestroy() { }
}