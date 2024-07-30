import { IPost } from '../models/data.model';
import { createAction, props } from '@ngrx/store';

const loadPosts = createAction('[Posts] Load Posts');
const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: IPost[] }>());
const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: string }>());
/* const loadMorePosts = createAction('[Posts] Load More Posts');
const loadMorePostsSuccess = createAction('[Posts] Load More Posts Success', props<{ posts: IPost[] }>());
const loadMorePostsFailure = createAction('[Posts] Load More Posts Failure', props<{ error: string }>()); */

const searchPosts = createAction('[Posts] Search Posts', props<{search: string}>());
// const searchPostsSuccess = createAction('[Posts] Search Posts Success', props<{ posts: IPost[] }>());

export const BlogActions = {
    loadPosts, loadPostsSuccess, loadPostsFailure,
    // loadMorePosts, loadMorePostsSuccess, loadMorePostsFailure,
    searchPosts
};
