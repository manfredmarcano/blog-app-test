import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { provideHttpClient } from '@angular/common/http';
import { SearcherComponent } from './components/searcher/searcher.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state';
import { BlogEffects } from './state/effects';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearcherComponent,
    FooterComponent,
    NotFoundComponent,
    UserModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // NgbModule,
    NgbCollapseModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BlogEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
