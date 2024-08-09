import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromReducer from './reducers';
import { IPost } from '../models/data.model';

export interface State {
  blog: fromReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  blog: fromReducer.reducer
};

export const getStateSelector = createSelector(
  createFeatureSelector('blog'),
  fromReducer.getState
);

export const Selectors = {
  getResultPosts: createSelector(getStateSelector, (state: fromReducer.State) => state.posts),
  getPostsCount: createSelector(getStateSelector, (state: fromReducer.State) => state.posts.length),
  isLoading: createSelector(getStateSelector, (state: fromReducer.State) => state.loading),
  getPagination: createSelector(getStateSelector, (state: fromReducer.State) => `?_page=${state.page}&_limit=${state.limit}`),
  hasPaginationFinished: createSelector(getStateSelector, (state: fromReducer.State) => state.hasPaginationFinished),
  getDataBaseData: createSelector(getStateSelector, (state: fromReducer.State) => state.db),
  getToken: createSelector(getStateSelector, (state: fromReducer.State) => state.token),
  getActiveView: createSelector(getStateSelector, (state: fromReducer.State) => state.view),
  getPostData: (id: number | string) => createSelector(getStateSelector, (state: fromReducer.State) => state.auxPosts.find((post: IPost) => +post.id === +id) || null ),
  getFavoritesPostsIds: createSelector(getStateSelector, (state: fromReducer.State) => state.auxFavoritesPosts.map((post: IPost) => post.id)),
  isModalOpen: createSelector(getStateSelector, (state: fromReducer.State) => state.modalOpen),
}