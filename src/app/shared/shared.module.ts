import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleItemComponent } from './components/article-item/article-item.component';

@NgModule({
  declarations: [
    ArticleItemComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
  ],
  exports: [
    ArticleItemComponent,
    TruncatePipe,
    CommonModule
  ]
})
export class SharedModule { }
