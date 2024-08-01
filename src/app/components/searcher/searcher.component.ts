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
  // activeView$: Observable<string>;
  private _currentView: string = '';

  constructor(private store: Store<State>) {
    this.postsCount$ = this.store.select(Selectors.getPostsCount);
    this.isLoading$ = this.store.select(Selectors.isLoading);

    this.store.select(Selectors.getActiveView).subscribe((view: string) => {
      this._currentView = view;
      this.searchInput = '';
    });
  }

  search(): void {
    this.store.dispatch(BlogActions.searchPosts({search: this.searchInput, view: this._currentView }));
  }
}
