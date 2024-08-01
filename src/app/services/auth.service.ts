import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable } from 'rxjs';
import { Selectors, State } from '../state';
import { IDataBase, IDataBaseUser } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _isAuthenticated: boolean = false;

  constructor(private store: Store<State>) {
    this.store.select(Selectors.getToken).subscribe((token: string | null) => this._isAuthenticated = !!token);
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  // Login simulation
  isUserInDataBase(db: IDataBase, email: string): boolean {
    return !!db.users.find((user: IDataBaseUser) => user.email.toUpperCase() === email.toUpperCase());
  }

}
