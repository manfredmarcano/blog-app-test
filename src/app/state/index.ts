import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromReducer from './reducers';

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
  getAllPosts: createSelector(getStateSelector, (state: fromReducer.State) => state.posts),
  getPostsCount: createSelector(getStateSelector, (state: fromReducer.State) => state.posts.length),
  isLoading: createSelector(getStateSelector, (state: fromReducer.State) => state.loading),
  getPagination: createSelector(getStateSelector, (state: fromReducer.State) => `?_page=${state.page}&_limit=${state.limit}`),
  hasPaginationFinished: createSelector(getStateSelector, (state: fromReducer.State) => state.hasPaginationFinished),
  getDataBaseData: createSelector(getStateSelector, (state: fromReducer.State) => state.db),
  getToken: createSelector(getStateSelector, (state: fromReducer.State) => state.token),
  getActiveView: createSelector(getStateSelector, (state: fromReducer.State) => state.view),
  getFavoritesPosts: createSelector(getStateSelector, (state: fromReducer.State) => state.favoritesPosts),
}