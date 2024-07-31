import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import { catchError, debounceTime, exhaustMap, map, switchMap } from 'rxjs/operators';
import { IPost } from '../models/data.model';
import { BlogActions } from './actions';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogEffects {
  constructor(private actions$: Actions, private dataService: DataService) { }

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadPosts),
      exhaustMap(action =>
        this.dataService.getData().pipe(
          map((posts: IPost[]) => BlogActions.loadPostsSuccess({ posts })),
          catchError((error) => of(BlogActions.loadPostsFailure({error})))
        )
      ),
    )
  );

  searchPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.searchPosts),
      debounceTime(500),
      switchMap(action =>
        of(BlogActions.searchPostsSuccess({ search: action.search }))
      ),
    )
  );
}