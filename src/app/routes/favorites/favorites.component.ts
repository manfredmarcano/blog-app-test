import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Selectors, State } from '../../state';
import { Observable } from 'rxjs';
import { IPost } from '../../models/data.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  favoritesPosts$: Observable<IPost[]>;

  constructor(private store: Store<State>) {
    this.favoritesPosts$ = this.store.select(Selectors.getFavoritesPosts);
  }

}
