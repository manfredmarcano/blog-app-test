import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Selectors, State } from '../../state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isCollapsed = true;
  routerLinkActiveOptions = { exact: true };
  isLoggedIn$: Observable<boolean>

  constructor(private store: Store<State>) {
    this.isLoggedIn$ = this.store.select(Selectors.getToken).pipe(map((token: string | null) => !!token));
  }
}
