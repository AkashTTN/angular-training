import { Post } from '../post.model';
import * as PostActions from './post.actions';

export interface State {
    id: number;
    body: string;
    title: string;
}

const initialState: Post = {
    id: 1,
    body: 'This is a default post',
    title: 'Default Post'
};

export function postReducer(state = initialState, action: PostActions.PostActions) {
    switch (action.type) {
        case PostActions.GET_POSTS:
        default: return state;
    }
}