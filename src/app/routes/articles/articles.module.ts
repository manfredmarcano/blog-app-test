import { NgModule } from '@angular/core';
import { ArticlesComponent } from './articles.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from '../article/article.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
  ],
  imports: [
    SharedModule,
    ArticlesRoutingModule,
  ],
  exports: []
})
export class ArticlesModule { }
