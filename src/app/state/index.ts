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

/* export const selectAllPosts = createSelector(
  getStateSelector,
  (state: fromReducer.State) => state.posts
); */

/* The code in the above file creates ‘selectors’ that are used to select a subset or slice of the
overall state object. At this point the state only includes the tasks array so we will retrieve
the entire state (using getStateSelector) and not a subset. As more features are coded into
the app you would create additional selectors ( getSelectedTaskSelector, etc) to support
them. */

export const Selectors = {
  getAllPosts: createSelector(getStateSelector, (state: fromReducer.State) => state.posts), // auxPosts
  getPostsCount: createSelector(getStateSelector, (state: fromReducer.State) => state.posts.length),
  isLoading: createSelector(getStateSelector, (state: fromReducer.State) => state.loading),
  getPagination: createSelector(getStateSelector, (state: fromReducer.State) => `?_page=${state.page}&_limit=${state.limit}`),
  hasPaginationFinished: createSelector(getStateSelector, (state: fromReducer.State) => state.hasPaginationFinished),
}