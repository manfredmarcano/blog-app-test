import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { provideHttpClient } from '@angular/common/http';
import { SearcherComponent } from './components/searcher/searcher.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './state';
import { BlogEffects } from './state/effects';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
// import { ArticlesComponent } from './routes/articles/articles.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearcherComponent,
    FooterComponent,
    NotFoundComponent,
    // ArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BlogEffects])
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  exports: [
    // ArticlesComponent
  ]
})
export class AppModule { }
