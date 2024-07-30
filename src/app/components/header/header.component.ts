import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Selectors, State } from '../../state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isCollapsed = true;
  routerLinkActiveOptions = { exact: true };

  constructor(private store: Store<State>) { }
}
