import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../models/data.model';
import { Selectors, State } from '../state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _apiUrl = 'https://my-json-server.typicode.com/manfredmarcano/blog-app';
  private _pagination: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<State>,
  ) {
    this.store.select(Selectors.getPagination).subscribe(pagination => this._pagination = pagination)
  }

  getData(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this._apiUrl}/posts${this._pagination}`);
  }

}
