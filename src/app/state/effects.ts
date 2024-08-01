import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import { catchError, debounceTime, exhaustMap, map, switchMap } from 'rxjs/operators';
import { IDataBase, IPost } from '../models/data.model';
import { BlogActions } from './actions';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { Selectors, State } from '.';

@Injectable({ providedIn: 'root' })
export class BlogEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private authService: AuthService,
    private store: Store<State>
  ) { }

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadPosts),
      exhaustMap(action =>
        this.dataService.getData().pipe(
          map((posts: IPost[]) => BlogActions.loadPostsSuccess({ posts })),
          catchError((error) => of(BlogActions.loadPostsFailure({ error })))
        ),
      ),
    ),
  );

  loadPostsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadPostsSuccess),
      map(action => BlogActions.loadDBData()),
    ),
  );

  searchPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.searchPosts),
      debounceTime(500),
      switchMap(({search, view}) =>
        of(BlogActions.searchPostsSuccess({ search, view }))
      ),
    ),
  );

  loadDBData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadDBData),
      exhaustMap(action =>
        this.dataService.getDataBaseData().pipe(
          map((db: IDataBase) => BlogActions.loadDBDataSuccess({ db: { users: db.users, favorites: db.favorites } })),
          catchError((error) => of(BlogActions.loadDBDataFailure({ error })))
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.login),
      switchMap(({ email, password }) =>
        this.store.select(Selectors.getDataBaseData).pipe(
          map((db: IDataBase) => {
            if (this.authService.isUserInDataBase(db, email)) {
              return BlogActions.loginSuccess({ token: email })
            }
            return BlogActions.loginFailure({error: 'Invalid user data'})
          }),
        ),
      ),
    ),
  );

}