import { IDataBase, IPost, TOAST } from '../models/data.model';
import { createAction, props } from '@ngrx/store';

const loadPosts = createAction('[Posts] Load Posts');
const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: IPost[] }>());
const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: string }>());
const searchPosts = createAction('[Posts] Search Posts', props<{ search: string, view: string }>());
const searchPostsSuccess = createAction('[Posts] Search Posts Success', props<{ search: string, view: string }>());
const loadDBData = createAction('[Data Base] Load Data');
const loadDBDataSuccess = createAction('[Data Base] Load Data Success', props<{ db: IDataBase }>());
const loadDBDataFailure = createAction('[Data Base] Load Data Failure', props<{ error: string }>());
const login = createAction('[Login] User Login', props<{ email: string, password: string }>());
const loginSuccess = createAction('[Login] Login Success', props<{ token: string }>());
const loginFailure = createAction('[Login] Login Failure', props<{ error: string }>());
const changedView = createAction('[View] Changed', props<{ view: string }>());
const toggleFavorite = createAction('[Posts] Toggle Favorite', props<{ id: number }>());
const toggleUserModal = createAction('[View] Toggle User Modal', props<{ isLogin: boolean }>() );
const displayToast = createAction('[View] Display Toast', props<{ toastType: TOAST, title: string, description: string }>() );

export const BlogActions = {
  loadPosts, loadPostsSuccess, loadPostsFailure,
  searchPosts, searchPostsSuccess,
  loadDBData, loadDBDataSuccess, loadDBDataFailure,
  login, loginSuccess, loginFailure,
  changedView,
  toggleFavorite,
  toggleUserModal,
  displayToast,
};
