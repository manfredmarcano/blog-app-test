import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from './article/article.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    ArticleItemComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    NgbTooltipModule,
  ],
  exports: []
})
export class ArticlesModule { }
