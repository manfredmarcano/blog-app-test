import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Selectors, State } from '../../state';
import { Observable } from 'rxjs';
import { BlogActions } from '../../state/actions';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent {
  postsCount$: Observable<number>;
  isLoading$: Observable<boolean>;
  searchInput: string = '';

  constructor(private store: Store<State>) {
    this.postsCount$ = this.store.select(Selectors.getPostsCount);
    this.isLoading$ = this.store.select(Selectors.isLoading);
  }

  search(): void {
    this.store.dispatch(BlogActions.searchPosts({search: this.searchInput}));
  }
}
