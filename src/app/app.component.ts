import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Selectors, State } from './state';
import { BlogActions } from './state/actions';
import { skip } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, ActivationEnd, ActivationStart, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.store.dispatch(BlogActions.loadDBData());
    this.store.dispatch(BlogActions.loadPosts());

    // QUITAR
    this.store.select(Selectors.getDataBaseData).pipe(skip(1)).subscribe(data => {
      console.log('DB: ', data);
      this.store.dispatch(BlogActions.login({ email: 'manfredalberto@gmail.com', password: '123'}));
    });

    // QUITAR 
    console.log('AUTH1: ', this.authService.isAuthenticated())
    setTimeout(() => {
      console.log('AUTH2: ', this.authService.isAuthenticated())
    }, 2000);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.store.dispatch(BlogActions.changedView({ view: event.url.substring(1) }));
      }
    });

  }
}
