import { Action } from '@ngrx/store';

import { Post } from '../post.model';

export const GET_POSTS = 'GET_POSTS';
export const CREATE_POST = 'CREATE_POST';

export class GetPosts implements Action {
    readonly type = GET_POSTS;
}

export class CreatePost implements Action {
    readonly type = CREATE_POST;
    constructor(public payload: Post) { }
}

export type PostActions = GetPosts | CreatePost;
