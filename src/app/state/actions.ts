import { IPost } from '../models/data.model';
import { createAction, props } from '@ngrx/store';

const loadPosts = createAction('[Posts] Load Posts');
const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: IPost[] }>());
const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: string }>());
const searchPosts = createAction('[Posts] Search Posts', props<{ search: string }>());
const searchPostsSuccess = createAction('[Posts] Search Posts Success', props<{ search: string }>());

export const BlogActions = {
    loadPosts, loadPostsSuccess, loadPostsFailure,
    searchPosts, searchPostsSuccess
};
