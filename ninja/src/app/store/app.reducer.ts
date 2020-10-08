import { ActionReducerMap } from '@ngrx/store';

import * as fromPost from '../posts/store/post.reducer';

export interface AppState {
    post: fromPost.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    post: fromPost.postReducer
}