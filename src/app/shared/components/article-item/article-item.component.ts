import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { IPost } from '../../../models/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.scss'
})
export class ArticleItemComponent implements AfterViewInit {

  @Input()
  data!: IPost;

  titleLength: number = 50;
  contentLength: number = 100;

  constructor(private hostElement: ElementRef, private router: Router) { }

  ngAfterViewInit() {
    this.hostElement.nativeElement.addEventListener('click', this.goToArticle.bind(this));
  }

  goToArticle() {
    this.router.navigate([`articles/${this.data.id}`]);
  }

  setFavorite(event: MouseEvent) {
    event.stopPropagation();
    alert('FAVORITE ' + this.data.id);
  }

}
