import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { IPost } from '../../../models/data.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../../state';
import { BlogActions } from '../../../state/actions';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.scss'
})
export class ArticleItemComponent implements AfterViewInit {

  @Input()
  data!: IPost;

  @Input()
  set favorites(value: (string | number)[]) {
    this.isFavorite = value.map(val => +val).includes(+this.data.id);
  }
  
  isFavorite: boolean = false;
  titleLength: number = 50;
  contentLength: number = 100;

  constructor(
    private hostElement: ElementRef,
    private router: Router,
    private store: Store<State>,
  ) { }

  ngAfterViewInit() {
    this.hostElement.nativeElement.addEventListener('click', this.goToArticle.bind(this));
  }

  goToArticle() {
    this.router.navigate([`articles/${this.data.id}`]);
  }

  setFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(BlogActions.toggleFavorite({ id: +this.data.id }));
  }

}
