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
  showSearcher: boolean = true;
  private _currentView: string = '';

  constructor(private store: Store<State>) {
    this.postsCount$ = this.store.select(Selectors.getPostsCount);
    this.isLoading$ = this.store.select(Selectors.isLoading);

    this.store.select(Selectors.getActiveView).subscribe((view: string) => {
      this._currentView = view;
      const isArticleDetails: boolean = (/^articles\/[0-9]+$/i).test(view);
      this.showSearcher = !isArticleDetails;
      this.searchInput = '';
    });

    this.store.select(Selectors.hasPaginationFinished).subscribe((val: boolean) => {
      if (val) {
        this.searchInput = '';
      }
    });
  }

  search(): void {
    this.store.dispatch(BlogActions.searchPosts({search: this.searchInput, view: this._currentView }));
  }
}
