import { Action, createReducer, on } from '@ngrx/store';
import { IPost } from '../models/data.model';
import { BlogActions } from './actions';

export interface State {
  posts: IPost[];
  auxPosts: IPost[];
  loading: boolean;
  error: string;
  postsCount: number;
  page: number;
  limit: number;
  hasPaginationFinished: boolean;
}

export const getState = (state: State) => { return state; };

export const initialState: State = {
  posts: [],
  auxPosts: [],
  loading: false,
  error: '',
  postsCount: 0,
  page: 1,
  limit: 6,
  hasPaginationFinished: true,
};

export function reducer(state: State | undefined, action: Action) {
  return blogAppReducer(state, action);
}

const blogAppReducer = createReducer(
  initialState,
  on(BlogActions.loadPosts, state => ({ ...state, loading: true })),
  on(BlogActions.loadPostsSuccess, (state, { posts }) =>({
    ...state,
    posts: state.auxPosts.concat(posts),
    auxPosts: state.auxPosts.concat(posts),
    loading: false,
    postsCount: posts.length,
    page: state.page + 1,
    hasPaginationFinished: posts.length < state.limit,
  })),
  on(BlogActions.loadPostsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(BlogActions.searchPosts, state => ({ ...state, loading: true })),
  on(BlogActions.searchPostsSuccess, (state, { search }) => ({
    ...state,
    loading: false,
    posts: state.auxPosts.filter((post: IPost) =>
      post.title.toUpperCase().includes(search.toUpperCase()) ||
      post.content.toUpperCase().includes(search.toUpperCase()) ||
      post.author.name.toUpperCase().includes(search.toUpperCase()) ||
      post.monthlyPrice.toString().includes(search.toUpperCase())
    ),
  })),
);