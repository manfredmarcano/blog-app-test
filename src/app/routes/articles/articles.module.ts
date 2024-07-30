import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from './article/article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleItemComponent } from './article-item/article-item.component';

@NgModule({
  declarations: [ArticlesComponent, ArticleComponent, ArticleItemComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    // NgbModule,
  ],
  exports: [
    // ArticlesComponent
  ]
})
export class ArticlesModule { }
