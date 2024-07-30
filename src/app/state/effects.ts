import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
// import * as BlogActions from './actions';
import { IPost } from '../models/data.model';
import { BlogActions } from './actions';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogEffects {
  constructor(private actions$: Actions, private dataService: DataService) { }
  // triggered by the loadTasks action
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadPosts),
      exhaustMap(action =>
        this.dataService.getData().pipe(
          map((posts: IPost[]) => BlogActions.loadPostsSuccess({ posts })),
          catchError((error) => of(BlogActions.loadPostsFailure({error})))
        )
      ),
      // catchError(error => BlogActions.loadPostsFailure(error))
    )
  );
}