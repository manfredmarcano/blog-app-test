import { Component, Input } from '@angular/core';
import { IPost } from '../../../models/data.model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.scss'
})
export class ArticleItemComponent {

  @Input()
  data!: IPost;

}
