import { Action, createReducer, on } from '@ngrx/store';
import { IDataBase, IDataBaseFavorites, IDataBaseUser, IPost } from '../models/data.model';
import { BlogActions } from './actions';
import { FAVORITES } from '../app-routing.module';

export interface State {
  posts: IPost[];
  auxFavoritesPosts: IPost[];
  auxPosts: IPost[];
  loading: boolean;
  error: string;
  postsCount: number;
  page: number;
  limit: number;
  hasPaginationFinished: boolean;
  db: IDataBase;
  token: string | null;
  view: string;
}

export const getState = (state: State) => { return state; };

export const initialState: State = {
  posts: [],
  auxFavoritesPosts: [],
  auxPosts: [],
  loading: false,
  error: '',
  postsCount: 0,
  page: 1,
  limit: 6,
  hasPaginationFinished: true,
  db: {
    users: [],
    favorites: [],
  },
  token: null,
  view: '',
};

export function reducer(state: State | undefined, action: Action) {
  return blogAppReducer(state, action);
}

const blogAppReducer = createReducer(
  initialState,
  on(BlogActions.loadPosts, state => ({ ...state, loading: true })),
  on(BlogActions.loadPostsSuccess, (state, { posts }) => ({
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
  on(BlogActions.searchPostsSuccess, (state, { search, view }) => ({
    ...state,
    loading: false,
    posts: state[view === FAVORITES ? 'auxFavoritesPosts': 'auxPosts'].filter((post: IPost) =>
      post.title.toUpperCase().includes(search.toUpperCase()) ||
      post.content.toUpperCase().includes(search.toUpperCase()) ||
      post.author.name.toUpperCase().includes(search.toUpperCase()) ||
      post.monthlyPrice.toString().includes(search.toUpperCase())
    ),
  })),
  on(BlogActions.loadDBDataSuccess, (state, { db }) =>({ ...state, db })),
  on(BlogActions.loadDBDataFailure, (state, { error }) => ({ ...state, error })),
  on(BlogActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    auxFavoritesPosts:
      state.auxPosts.filter((post: IPost) => 
        state.db.favorites
        .find((userFavorites: IDataBaseFavorites) => 
          +userFavorites.user === state.db.users.find((user: IDataBaseUser) => user.email.toUpperCase() === token.toUpperCase())?.id
        )?.posts
        .includes(+post.id)
      ),
  })),
  on(BlogActions.changedView, (state, { view }) =>({
    ...state,
    view,
    posts: view === FAVORITES ? state.auxFavoritesPosts : state.auxPosts,
  })),
  on(BlogActions.toggleFavorite, (state, { id }) =>({
    ...state,
    posts: state.view === FAVORITES ? state.posts.filter((post: IPost) => post.id !== id): state.posts,
    auxFavoritesPosts: !!state.auxFavoritesPosts.find((post: IPost) => post.id === id)
      ? state.auxFavoritesPosts.filter((post: IPost) => post.id !== id)
      : state.auxFavoritesPosts.concat(state.auxPosts.filter((post: IPost) => post.id === id))
  })),
);