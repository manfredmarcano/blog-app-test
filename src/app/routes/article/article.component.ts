import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../models/data.model';
import { Store } from '@ngrx/store';
import { Selectors, State } from '../../state';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  data: IPost | null = null;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.select(Selectors.getPostData(params['id'])).subscribe((data: IPost | null) => {
        console.log(data);
        this.data = data;
      });
    });
  }

}
