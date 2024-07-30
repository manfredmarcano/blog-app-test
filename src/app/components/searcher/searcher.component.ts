import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Selectors, State } from '../../state';
import { debounceTime, exhaustMap, Observable, of, pipe, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { BlogActions } from '../../state/actions';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent {
  postsCount$: Observable<number>;
  searchInput: string = '';

  constructor(private store: Store<State>) {
    this.postsCount$ = this.store.select(Selectors.getPostsCount);
  }

  search(): void {
    this.store.dispatch(BlogActions.searchPosts({search: this.searchInput}));
  }
}
