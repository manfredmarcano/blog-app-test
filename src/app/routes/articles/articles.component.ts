import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../models/data.model';
import { Store } from '@ngrx/store';
import { Selectors, State } from '../../state';
import { BlogActions } from '../../state/actions';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
  posts$: Observable<IPost[]>;
  loading$: Observable<boolean>;
  hasPaginationFinished$: Observable<boolean>;
  getFavoritesPostsIds$: Observable<(string | number)[]>;

  constructor(private store: Store<State>) {
    this.posts$ = this.store.select(Selectors.getResultPosts);
    this.loading$ = this.store.select(Selectors.isLoading);
    this.hasPaginationFinished$ = this.store.select(Selectors.hasPaginationFinished);
    this.getFavoritesPostsIds$ = this.store.select(Selectors.getFavoritesPostsIds);
  }

  loadMorePosts(): void {
    this.store.dispatch(BlogActions.loadPosts());
  }
}
